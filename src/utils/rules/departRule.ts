export default {
  departmentName: [
    {
      required: true,
      message: '部门名称不能为空'
    },
    {
      min: 3,
      message: '部门名称最少3个字符'
    },
    {
      max: 20,
      message: '部门名称最多20个字符'
    }
  ]
}
