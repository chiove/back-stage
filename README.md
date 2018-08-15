

学生打卡页面
  1、系统配置模块接口-获取系统配置  GET /system-config 打卡查寝时间，打卡地址都有
  2、学生操作接口-学生打卡 POST /student-clock
  3、学生操作接口-根据学生ID查询当前考勤状态 GET /student-clock-status
  4、下拉数据查询接口-根据用户ID查询基本信息 GET /select-data/user/{userId}
  5、学生操作接口-统计学生累计晚归，到勤，未归次数 GET  /student-clock/{studentId}/stat 到勤次数为打卡次数


打卡统计页面
  1、学生操作接口-根据学生ID查询学生基本信息 GET /student/{id}
  2、学生操作接口-统计学生累计晚归，到勤，未归次数 GET  /student-clock/{studentId}/stat 到勤次数为打卡次数
  3、学生操作接口-根据年月查询打卡记录 GET /student-clock
  4、学生操作接口-根据学生ID和日期查询全部历史 GET /student-clock-history

辅导员打卡页面
  1、辅导员操作接口-根据辅导员ID统计总打卡次数 GET /instructor-clock/stat-all-count
  2、下拉数据查询接口-根据用户ID查询基本信息 GET /select-data/user/{userId}
  3、 辅导员操作接口-根据年月辅导员考勤统计 GET /instructor-clock/stat-by-year-month
  4、辅导员操作接口-辅导员打卡 POST /instructor-clock
  5、辅导员操作接口-根据辅导员ID查询当前考勤状态 GET /instructor-clock-status

学生关怀页面
  1、辅导员操作接口-分页查询辅导员关怀或待关怀列表 GET /care-instructor
  2、辅导员操作接口-提交关怀结果 PUT /care


查寝页面
  1、查寝操作接口-根据用户查询宿舍楼 GET /dormitory-building/query-by-user  下拉
  2、查寝操作接口-根据用户查询宿舍楼下的宿舍 GET /dormitory/query-by-user    下拉
  3、查寝操作接口-根据姓名和学号查询学生列表  GET /dormitory-check/query-by-name-code 搜素框
  4、查寝操作接口-根据条件查询宿舍列表 GET /dormitory-list-query
  5、查寝操作接口-结束查寝 POST /dormitory-check


日统计页面
  1、查寝操作接口-查寝日统计  GET /dormitory-check/day-stat
  2、查寝操作接口-日统计学生列表 GET /dormitory-check/day-stat/student

周统计页面
  1、查寝操作接口-查寝周统计 GET /dormitory-check/week-stat
  2、查寝操作接口-周统计学生列表 GET /dormitory-check/week-stat/student


通用登陆页面
  1、通用登陆模块-通用登录接口  POST /login


大屏监控
  1、大屏监控模块接口-大屏幕数据统计 GET /big-screen-monitor/data-stat
  2、大屏监控模块接口-大屏幕文案 GET /big-screen-monitor/copy-writing
  3、大屏监控模块接口-二维码图片 GET /big-screen-monitor/qrcode-image



PC个人详情页
  1、学生操作接口-根据学生ID查询学生基本信息 GET /student/{id}
  2、学生操作接口-统计学生累计晚归，到勤，未归次数 GET /student-clock/{studentId}/stat
  3、学生操作接口-个人详情页-分页查询学生已关怀列表(个人详情页需要调用) GET /care-student
  4、历史打卡数据和详情列表复用之前的。

系统维护设置
  1、系统配置模块接口-修改系统配置 PUT /system-config
  2、系统配置模块接口-修改大屏幕显示文本 PUT /screen-config
  3、系统配置模块接口-获取大屏幕显示文本 GET /screen-config
  4、系统配置模块接口-根据年月获取打卡日列表 GET /clock-day-list
  5、系统配置模块接口-学期新增 POST /term
  6、系统配置模块接口-当前学期列表查询 GET /term

实时统计
  1、实时统计模块接口-按宿舍实时统计 GET /real-time-stat/clock-stat-by-bulding
  2、实时统计模块接口-学生实时统计 GET /real-time-stat/clock-stat-by-student

数据复核
  1、后台-考勤数据复核模块接口-数据复核分页查询 GET /data-recheck/student-clock-care-stat

个人详情页
参考PC个人详情页

用户角色管理
  1、用户角色管理模块接口-学生分页查询 GET/user-role-manage/student
  2、用户角色管理模块接口-清除常用手机 DELETE /user-role-manage/student-phone
  3、用户角色管理模块接口-辅导员分页查询 GET /user-role-manage/instructor
  4、用户角色管理模块接口-二级学院管理员分页查询 GET /user-role-manage/secondary-college-admin
  5、用户角色管理模块接口-宿舍管理员分页查询 GET /user-role-manage/dormitory-admin
  6、用户角色管理模块接口-学生处管理员分页查询 GET /user-role-manage/student-office-admin
  7、用户角色管理模块接口-机构树查询 GET /user-role-manage/org-tree
  8、用户角色管理模块接口-根据机构查所属教职工 GET /user-role-manage/org/{orgId}/staff
  9、用户角色管理模块接口-根据角色类型查询全部教职工 GET /user-role-manage/staff/all
  10、用户角色管理模块接口-删除账号 PUT /user-role-manage/delete-account
  11、用户角色管理模块接口-保存学生处管理员列表 POST /student-office-admin
  12、用户角色管理模块接口-保存宿舍管理员列表 POST /dormitory-admin
  13、用户角色管理模块接口-保存二级学院管理员列表 POST /secondary-college-admin
