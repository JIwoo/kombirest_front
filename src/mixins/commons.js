export const validationCheck = {
    methods: {
        // !value 하면 생기는 논리적 오류를 제거하기 위해 명시적으로 value == 사용하며 [], {} 도 빈값으로 처리
        fnIsEmpty(value) {
            value = value.trim();

            if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
                return true;
            } else {
                return false;
            }
        },
        // 닉네임 형식 체크
        fnNickNmValidation(value) {
            //한글, 영문, 숫자만 입력가능 정규표현식
            const format = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/;
            if (value.search(format) != -1)
                return true; //올바른 포맷 형식

            return false;
        },
        // 이메일 형식 체크
        fnIsEmailValidation(value) {
            const format = /^((\w|[-.])+)@((\w|[-.])+)\.([A-Za-z]+)$/;
            if (value.search(format) != -1)
                return true; //올바른 포맷 형식

            return false;
        },
        // 이메일 체크 
        fnCheckEmail() {

            if (this.fnIsEmpty(this.email)) {
                this.showEmailMsg = true;
                this.emailMsg = "이메일 주소를 입력 해 주세요.";
                return;
            } else if (!this.fnIsEmailValidation(this.email)) {
                this.showEmailMsg = true;
                this.emailMsg = "올바르지 않은 이메일 주소입니다.";
                return;
            }
            this.showEmailMsg = false;
            this.emailMsg = "";
        },
        // 비밀번호 체크(영문 대소문자, 숫자 기호)
        fnIsPwdValidation(value) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&#+-])[A-Za-z\d_@$!%*?&#+-]/gi;
            return regex.test(value);
        },

        // 기존 비밀번호 체크
        fnCheckOldPwd() {

            if (this.fnIsEmpty(this.oldPwd)) {
                this.showOldPwdMsg = true;
                this.oldPwdMsg = "기존 비밀번호를 입력 해 주세요.";
                return;
            } else if (!this.fnIsPwdValidation(this.oldPwd)) {
                this.showOldPwdMsg = true;
                this.oldPwdMsg = "영문 대소문자, 숫자, 기호 포함 8자리 이상 입력 해 주세요.";
                return;
            } else if (this.oldPwd.length < 8 || this.oldPwd.length > 30) {
                this.showOldPwdMsg = true;
                this.oldPwdMsg = "비밀번호는 8자리 이상 30자리 이하로 입력 해 주세요.";
                return;
            }
            this.showOldPwdMsg = false;
            this.oldPwdMsg = "";
        },
        // 비밀번호 체크
        fnCheckPwd() {

            if (this.fnIsEmpty(this.pwd)) {
                this.showPwdMsg = true;
                this.pwdMsg = "비밀번호를 입력 해 주세요.";
                return;
            } else if (!this.fnIsPwdValidation(this.pwd)) {
                this.showPwdMsg = true;
                this.pwdMsg = "영문 대소문자, 숫자, 기호 포함 8자리 이상 입력 해 주세요.";
                return;
            } else if (this.pwd.length < 8 || this.pwd.length > 30) {
                this.showPwdMsg = true;
                this.pwdMsg = "비밀번호는 8자리 이상 30자리 이하로 입력 해 주세요.";
                return;
            }
            this.showPwdMsg = false;
            this.pwdMsg = "";
        },
        // 패스워드 & 리패스워드 확인
        fnRecheckPwd() {

            if (!(this.pwd === this.rePwd)) {
                this.showRePwdMsg = true;
                this.rePwdMsg = "비밀번호와 동일하지 않습니다.";
                return;
            }
            this.showRePwdMsg = false;
            this.rePwdMsg = "";
        },
        // 닉네임 확인
        fnCheckNickNm() {
            if (this.fnIsEmpty(this.nickNm)) {
                this.showNickNmMsg = true;
                this.nickNmMsg = "닉네임을 입력 해 주세요.";
                return;
            } else if (!this.fnNickNmValidation(this.nickNm)) {
                this.showNickNmMsg = true;
                this.nickNmMsg = "한글, 영문, 숫자만 입력 가능합니다.";
                return;
            } else if (this.nickNm.length < 2 || this.nickNm.length > 11) {
                this.showNickNmMsg = true;
                this.nickNmMsg = "닉네임은 2자리 이상 10자리 이하로 입력 해 주세요.";
                return;
            }
            this.showNickNmMsg = false;
            this.nickNmMsg = "";
        },
        // 로그인 & 회원가입 최종 유효성 체크
        // type 1: 회원가입, 2: 로그인, 3: 비밀번호 찾기 > 이메일 입력. 4: 비밀번호 변경, 5: 비밀번호 변경(설정창), 6: 닉네임만 체크
        fnMsgValidation(type) {
            if (type === 1) {
                if (this.emailMsg === true || this.pwdMsg === true || this.rePwdMsg === true || this.nickNmMsg === true) {
                    return false;
                }
                if (this.email === "" || this.pwd === "" || this.rePwd === "" || this.nickNm === "") {
                    return false;
                }
            } else if (type === 2) {
                if (this.emailMsg !== "" || this.pwdMsg !== "") {
                    return false;
                }
            } else if (type === 3) {
                if (this.emailMsg !== "") {
                    return false;
                }
            } else if (type === 4) {
                if (this.pwdMsg !== "" || this.rePwdMsg !== "") {
                    return false;
                }
            } else if (type === 5) {
                if (this.oldPwdMsg !== "" || this.pwdMsg !== "" || this.rePwdMsg !== "") {
                    return false;
                }
            } else if (type === 6) {
                if (this.nickNmMsg !== "") {
                    return false;
                }
            }
            return true;
        }
        
    }
}
export const selectDate = {
    methods: {
        // 14세 이상 출생년도 값 추가
        fnAppendYear() {
            var date = new Date();
            var year = date.getFullYear() - 14;
            var selectValue = document.getElementById("birthYear");
            var optionIndex = 0;

            for (var i = year - 100; i <= year; i++) {
                selectValue.add(new Option(i, i), optionIndex++);
            }

        },
        // 1~12월 값 추가
        fnAppendMonth() {
            var selectValue = document.getElementById("birthMonth");
            var optionIndex = 0;

            for (var i = 1; i <= 12; i++) {
                selectValue.add(new Option(i, i), optionIndex++);
            }
        },
        // 1~31일 값 추가
        fnAppendDay() {
            var selectValue = document.getElementById("birthDate");
            var optionIndex = 0;
            for (var i = 1; i <= 31; i++) {
                selectValue.add(new Option(i, i), optionIndex++);
            }
        }
    }
}