<template>
  <div class="role-manage">
    <!-- 顶部操作栏 -->
    <div class="operation-bar">
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>新增角色
      </el-button>
    </div>

    <!-- 角色列表 -->
    <el-table v-loading="loading" :data="roleList" style="width: 100%; margin-top: 20px">
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="description" label="描述" show-overflow-tooltip />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column label="操作" width="250" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
          <el-button type="primary" link @click="handlePermission(row)">权限设置</el-button>
          <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑角色对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增角色' : '编辑角色'"
      width="500px"
    >
      <el-form
        ref="roleFormRef"
        :model="roleForm"
        :rules="roleRules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="roleForm.roleCode" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="roleForm.description"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="roleForm.status"
            :active-value="1"
            :inactive-value="0"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 权限设置对话框 -->
    <el-dialog
      v-model="permissionDialogVisible"
      title="权限设置"
      width="600px"
    >
      <el-tree
        ref="permissionTreeRef"
        :data="permissionList"
        :props="{ label: 'permissionName', children: 'children' }"
        show-checkbox
        node-key="permissionId"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getRoleList, createRole, updateRole, deleteRole, getPermissionList } from '@/api/role'

// 数据列表
const loading = ref(false)
const roleList = ref([])
const permissionList = ref([])

// 表单相关
const dialogVisible = ref(false)
const dialogType = ref('add')
const roleFormRef = ref(null)
const roleForm = ref({
  roleName: '',
  roleCode: '',
  description: '',
  status: 1
})

const roleRules = {
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  roleCode: [
    { required: true, message: '请输入角色编码', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ]
}

// 权限设置相关
const permissionDialogVisible = ref(false)
const permissionTreeRef = ref(null)
const currentRole = ref(null)

// 获取角色列表
const fetchRoleList = async () => {
  try {
    loading.value = true
    const data = await getRoleList()
    roleList.value = data
  } catch (error) {
    ElMessage.error('获取角色列表失败')
  } finally {
    loading.value = false
  }
}

// 获取权限列表
const fetchPermissionList = async () => {
  try {
    const data = await getPermissionList()
    permissionList.value = data
  } catch (error) {
    ElMessage.error('获取权限列表失败')
  }
}

// 新增角色
const handleAdd = () => {
  dialogType.value = 'add'
  roleForm.value = {
    roleName: '',
    roleCode: '',
    description: '',
    status: 1
  }
  dialogVisible.value = true
}

// 编辑角色
const handleEdit = (row) => {
  dialogType.value = 'edit'
  roleForm.value = { ...row }
  dialogVisible.value = true
}

// 删除角色
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除该角色吗？', '提示', {
      type: 'warning'
    })
    await deleteRole(row.roleId)
    ElMessage.success('删除成功')
    fetchRoleList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!roleFormRef.value) return
  
  try {
    await roleFormRef.value.validate()
    if (dialogType.value === 'add') {
      await createRole(roleForm.value)
      ElMessage.success('创建成功')
    } else {
      await updateRole(roleForm.value.roleId, roleForm.value)
      ElMessage.success('更新成功')
    }
    dialogVisible.value = false
    fetchRoleList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(dialogType.value === 'add' ? '创建失败' : '更新失败')
    }
  }
}

// 打开权限设置
const handlePermission = (row) => {
  currentRole.value = row
  permissionDialogVisible.value = true
  // 设置已选权限
  if (permissionTreeRef.value) {
    permissionTreeRef.value.setCheckedKeys(row.permissions || [])
  }
}

// 提交权限设置
const handlePermissionSubmit = async () => {
  if (!currentRole.value || !permissionTreeRef.value) return
  
  try {
    const checkedKeys = permissionTreeRef.value.getCheckedKeys()
    await updateRole(currentRole.value.roleId, {
      ...currentRole.value,
      permissionIds: checkedKeys
    })
    ElMessage.success('权限设置成功')
    permissionDialogVisible.value = false
    fetchRoleList()
  } catch (error) {
    ElMessage.error('权限设置失败')
  }
}

onMounted(() => {
  fetchRoleList()
  fetchPermissionList()
})
</script>

<style lang="scss" scoped>
.role-manage {
  padding: 20px;
  
  .operation-bar {
    margin-bottom: 20px;
  }
}
</style> 