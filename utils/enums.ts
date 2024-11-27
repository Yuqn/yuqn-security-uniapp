/* 
 定义枚举IdentityCode，0表示学生身份，1表示教师身份
 */
export enum IdentityCode {
	ORDER = '-1',
	STUDENT = '0',
	TEACHER = '1'
}

export enum StatusCode {
  OK = 200,
  NotFound = 404,
  InternalServerError = 500,
}

/* 
 定义枚举IsCheck，0表示勾选，1表示未勾选
 */
export enum IsCheck {
		YES = '1',
		NO = '0'
	}