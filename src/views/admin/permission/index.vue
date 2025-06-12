<template>
  <div class="permission-container">
    <el-card class="permission-card">
      <template #header>
        <div class="card-header">
          <span>权限管理</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>新增权限
          </el-button>
        </div>
      </template>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="permissionList"
        style="width: 100%"
      >
        <el-table-column label="权限名称">
          <template #default="{ row }">
            {{ row.permission_name }}
          </template>
        </el-table-column>
        <el-table-column label="权限代码">
          <template #default="{ row }">
            {{ row.permission_code }}
          </template>
        </el-table-column>
        <el-table-column label="权限类型">
          <template #default="{ row }">
            {{ row.permission_type }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="权限描述" show-overflow-tooltip />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <div class="operation-buttons">
              <el-button
                type="primary"
                size="small"
                :icon="Edit"
                circle
                @click="handleEdit(row)"
                title="编辑"
              />
              <el-button
                type="danger"
                size="small"
                :icon="Delete"
                circle
                @click="handleDelete(row)"
                title="删除"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="500px"
      @close="handleDialogClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="权限名称" prop="permission_name">
          <el-input v-model="form.permission_name" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="权限代码" prop="permission_code">
          <el-input v-model="form.permission_code" placeholder="请输入权限代码" />
        </el-form-item>
        <el-form-item label="权限类型" prop="permission_type">
          <el-input v-model="form.permission_type" placeholder="请输入权限类型，如：menu-菜单、button-按钮" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="请输入权限描述"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getPermissionList,
  createPermission,
  updatePermission,
  deletePermission
} from '@/api/permission'

// 数据列表
const loading = ref(false)
const permissionList = ref([])

// 表单相关
const dialogVisible = ref(false)
const dialogTitle = ref('')
const formRef = ref(null)
const form = ref({
  permission_id: '',
  permission_name: '',
  permission_code: '',
  permission_type: '',
  description: ''
})

// 表单校验规则
const rules = {
  permission_name: [
    { required: true, message: '请输入权限名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  permission_code: [
    { required: true, message: '请输入权限代码', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  permission_type: [
    { required: true, message: '请输入权限类型', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  description: [
    { max: 200, message: '长度不能超过 200 个字符', trigger: 'blur' }
  ]
}

// 获取权限列表
const getList = async () => {
  try {
    loading.value = true
    const res = await getPermissionList()
    console.log('获取权限列表返回数据:', res)
    // 确保返回的是数组
    if (Array.isArray(res)) {
      permissionList.value = res
      console.log('直接使用返回的数组:', permissionList.value)
    } else if (Array.isArray(res.data)) {
      permissionList.value = res.data
      console.log('使用res.data数组:', permissionList.value)
    } else {
      permissionList.value = []
      console.error('权限列表数据格式错误:', res)
    }
    // 检查每个权限项的ID字段
    permissionList.value.forEach((item, index) => {
      console.log(`权限项 ${index}:`, {
        id: item.id,
        _id: item._id,
        permissionId: item.permissionId,
        allFields: Object.keys(item)
      })
    })
  } catch (error) {
    console.error('获取权限列表失败:', error)
    ElMessage.error('获取权限列表失败')
    permissionList.value = []
  } finally {
    loading.value = false
  }
}

// 新增权限
const handleAdd = () => {
  dialogTitle.value = '新增权限'
  // 重置表单
  if (formRef.value) {
    formRef.value.resetFields()
  }
  form.value = {
    permission_id: '',
    permission_name: '',
    permission_code: '',
    permission_type: '',
    description: ''
  }
  console.log('新增初始表单:', form.value)
  dialogVisible.value = true
}

// 编辑权限
const handleEdit = (row) => {
  console.log('编辑行数据:', row)
  
  dialogTitle.value = '编辑权限'
  // 重置表单
  if (formRef.value) {
    formRef.value.resetFields()
  }

  // 设置表单数据
  const permission_id = row.permission_id
  if (!permission_id) {
    console.error('错误：编辑数据缺少permission_id', row)
    ElMessage.error('编辑数据缺少ID')
    return
  }

  form.value = {
    permission_id,
    permission_name: row.permission_name,
    permission_code: row.permission_code,
    permission_type: row.permission_type,
    description: row.description || ''
  }
  
  console.log('编辑表单数据:', form.value)
  dialogVisible.value = true
}

// 删除权限
const handleDelete = async (row) => {
  try {
    // 获取权限ID
    const permission_id = row.permission_id
    if (!permission_id) {
      ElMessage.error('删除失败：缺少权限ID')
      return
    }

    // 显示确认对话框
    await ElMessageBox.confirm(
      '此操作将永久删除该权限，是否继续？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    // 调用删除接口
    loading.value = true
    await deletePermission(permission_id)
    
    ElMessage.success('删除成功')
    // 刷新列表
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除权限失败:', error)
      ElMessage.error(
        error.response?.data?.message || 
        error.message || 
        '删除失败'
      )
    }
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    // 构造提交的数据
    const submitData = {
      permission_name: form.value.permission_name,
      permission_code: form.value.permission_code,
      permission_type: form.value.permission_type,
      description: form.value.description || ''
    }

    const permission_id = form.value.permission_id
    console.log('提交前检查:', {
      permission_id,
      submitData
    })
    
    let result
    if (permission_id) {
      // 编辑
      console.log('执行更新操作，permission_id:', permission_id)
      result = await updatePermission(permission_id, submitData)
    } else {
      // 新增
      console.log('执行新增操作，表单数据:', submitData)
      result = await createPermission(submitData)
    }

    console.log('操作结果:', result)
    ElMessage.success(permission_id ? '更新成功' : '创建成功')
    dialogVisible.value = false
    getList()
  } catch (error) {
    console.error('提交表单失败:', error)
    if (error.code) {
      ElMessage.error(error.message || '操作失败')
    } else if (error.response?.data?.message) {
      ElMessage.error(error.response.data.message)
    } else if (error.message && error.message !== 'cancel') {
      ElMessage.error(error.message)
    }
  }
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 监听对话框关闭
const handleDialogClose = () => {
  resetForm()
}

// 页面加载时获取数据
onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.permission-container {
  padding: 20px;
  
  .permission-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  :deep(.el-dialog__body) {
    padding-top: 20px;
  }

  // 表格样式优化
  :deep(.el-table) {
    // 表格圆角和阴影
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    // 表头样式
    th {
      background-color: #f5f7fa !important;
      color: #606266;
      font-weight: 600;
      height: 50px;
      padding: 8px 16px;
    }

    // 表格行样式
    td {
      padding: 8px 16px;
    }

    // 鼠标悬停效果
    tr:hover td {
      background-color: #f5f7fa !important;
    }
  }

  // 操作按钮样式
  .operation-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;

    :deep(.el-button) {
      // 圆形按钮样式
      &.is-circle {
        width: 32px;
        height: 32px;
        padding: 8px;
        transition: all 0.3s ease;

        // 图标样式
        .el-icon {
          font-size: 14px;
        }

        // 主要按钮样式（编辑）
        &.el-button--primary {
          background: linear-gradient(135deg, #409eff, #3a8ee6);
          border: none;
          box-shadow: 0 2px 6px rgba(64, 158, 255, 0.2);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
          }
        }

        // 危险按钮样式（删除）
        &.el-button--danger {
          background: linear-gradient(135deg, #f56c6c, #e64242);
          border: none;
          box-shadow: 0 2px 6px rgba(245, 108, 108, 0.2);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
          }
        }
      }
    }
  }

  // 新增按钮样式
  :deep(.el-button--primary) {
    &:not(.is-circle) {
      background: linear-gradient(135deg, #409eff, #3a8ee6);
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      box-shadow: 0 2px 6px rgba(64, 158, 255, 0.2);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
      }

      .el-icon {
        margin-right: 6px;
      }
    }
  }
}
</style> 