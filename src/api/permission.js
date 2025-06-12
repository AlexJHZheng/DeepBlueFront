import request from '@/utils/request'

/**
 * 获取权限列表
 * @returns {Promise}
 */
export function getPermissionList() {
  return request({
    url: '/permissions',
    method: 'get'
  })
}

/**
 * 创建权限
 * @param {Object} data 权限信息
 * @returns {Promise}
 */
export function createPermission(data) {
  return request({
    url: '/permissions',
    method: 'post',
    data
  })
}

/**
 * 更新权限
 * @param {string} permission_id 权限ID
 * @param {Object} data 权限信息
 * @returns {Promise}
 */
export function updatePermission(permission_id, data) {
  console.log('更新权限:', { permission_id, data })
  return request({
    url: `/permissions/${permission_id}`,
    method: 'put',
    data
  })
}

/**
 * 删除权限
 * @param {string} permission_id 权限ID
 * @returns {Promise}
 */
export function deletePermission(permission_id) {
  return request({
    url: `/permissions/${permission_id}`,
    method: 'delete'
  })
} 