import request from './request'

// 获取角色列表
export function getRoleList() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

// 创建角色
export function createRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

// 更新角色
export function updateRole(roleId, data) {
  return request({
    url: `/roles/${roleId}`,
    method: 'put',
    data
  })
}

// 删除角色
export function deleteRole(roleId) {
  return request({
    url: `/roles/${roleId}`,
    method: 'delete'
  })
}

// 获取权限列表
export function getPermissionList() {
  return request({
    url: '/permissions',
    method: 'get'
  })
} 