import { createRouter, createWebHistory } from 'vue-router'

const routes = [
        // 인트로(소개)
        {
            path: '/Intro',
            name: 'Intro',
            component: () => import('../components/Account/Intro.vue')
        },
        // 메인
        {
            path: '/',
            name: 'Main',
            component: () => import('../views/Hot.vue')
        },
        // 로그인
        {
            path: '/Login',
            name: 'Login',
            component: () => import('../components/Account/Login.vue')
        },
        // 회원가입
        {
            path: '/Join',
            name: 'Join',
            component: () => import('../components/Account/Join.vue')
        },
        // 회원가입완료
        {
            path: '/JoinFin',
            name: 'JoinFin',
            component: () => import('../components/Account/JoinFin.vue')
        },
        // 비밀번호찾기
        {
            path: '/FindPwd',
            name: 'FindPwd',
            component: () => import('../components/Account/FindPwd.vue'),
            //beforeEnter: (to, from, next) => {
            //    if (localStorage.accessToken && localStorage.refreshToken) {
            //        next();
            //    }
            //    else {
            //        next(false);
            //    }
            //}
        },
        // 이메일인증
        {
            path: '/EmailAuth',
            name: 'EmailAuth',
            component: () => import('../components/Account/EmailAuth.vue')
        },
        // 비밀번호변경
        {
            path: '/ResetPwd',
            name: 'ResetPwd',
            component: () => import('../components/Account/ResetPwd.vue'),
            //beforeEnter: (to, from, next) => {
            //    if (localStorage.accessToken && localStorage.refreshToken) {
            //        next();
            //    }
            //    else {
            //        next(false);
            //    }
            //}
        },
        // 인기
        {
            path: '/Hot',
            name: 'Hot',
            component: () => import('../views/Hot.vue')
        },
        // 최신
        {
            path: '/New',
            name: 'New',
            component: () => import('../views/New.vue')
        },
        // 이용약관
        {
            path: '/Terms',
            name: 'Terms',
            component: () => import('../components/Terms.vue')
        },
        // 개인정보처리방침
        {
            path: '/Privacy',
            name: 'Privacy',
            component: () => import('../components/Privacy.vue')
        },
        // 공지사항
        {
            path: '/Notice',
            name: 'Notice',
            component: () => import('../components/Notice.vue')
        },
        // 마이페이지
        {
            path: '/Mypage/Post',
            name: 'MypagePost',
            component: () => import('../components/Mypage/MypagePost.vue'),
            beforeEnter: (to, from, next) => {
                if (localStorage.accessToken) {
                    next();
                }
                else {
                    next(false);
                }
            }
        },
        // 마이페이지
        {
            path: '/Mypage/Activity',
            name: 'MypageActivity',
            component: () => import('../components/Mypage/MypageActivity.vue'),
            beforeEnter: (to, from, next) => {
                if (localStorage.accessToken) {
                    next();
                }
                else {
                    next(false);
                }
            }
        },
        // 알림
        {
            path: '/Alarm',
            name: 'Alarm',
            component: () => import('../components/Alarm.vue')
        },
        // 세팅 - 프로필편집
        {
            path: '/Setting/Profile',
            name: 'SettingProfile',
            component: () => import('../components/Setting/SettingProfile.vue'),
            beforeEnter: (to, from, next) => {
                if (localStorage.accessToken) {
                    next();
                }
                else {
                    next(false);
                }
            }
        },
        // 세팅 - 비밀번호변경
        {
            path: '/Setting/PwdChange',
            name: 'SettingPwdChange',
            component: () => import('../components/Setting/SettingPwdChange.vue'),
            beforeEnter: (to, from, next) => {
                if (localStorage.accessToken) {
                    next();
                }
                else {
                    next(false);
                }
            }
        },
        // 세팅 - 이용 가이드라인
        {
            path: '/Setting/Guide',
            name: 'SettingGuide',
            component: () => import('../components/Setting/SettingGuide.vue')
        },
        // 세팅 - 이메일 문의하기
        {
            path: '/Setting/EmailInquiry',
            name: 'SettingEmailInquiry',
            component: () => import('../components/Setting/SettingEmailInquiry.vue')
        },
        // 이미지 테스트
        {
            path: '/TestImgSubmit',
            name: 'TestImgSubmit',
            component: () => import('../components/TestImgSubmit.vue')
        },
        //  게시물 생성하기
        {
            path: '/CreatePost',
            name: 'CreatePost',
            component: () => import('../components/CreatePost.vue'),
            beforeEnter: (to, from, next) => {
                if (localStorage.accessToken) {
                    next();
                }
                else {
                    next(false);
                }
            }
        },
        //  게시물 수정하기
        {
            path: '/Mypage/UpdatePost',
            name: 'MyPageUpdatePost',
            component: () => import('../components/Mypage/MyPageUpdatePost.vue'),
            beforeEnter: (to, from, next) => {
                if (localStorage.accessToken) {
                    next();
                }
                else {
                    next(false);
                }
            }
        },
        //게시물 상세보기 페이지
        {
            path: '/kombi/:idx',
            name: 'DetailPage',
            component: () => import('../components/DetailPage.vue')
        },
        //게시물 검색 결과 페이지
        {
            //path: '/Result/:search',
            path: '/Result',
            name: 'Result',
            component: () => import('../components/Result.vue')
        },
        //준비하기 페이지
        {
            path: '/Ready',
            name: 'Ready',
            component: () => import('../components/Ready.vue')
        },
        //유저 상세보기
        {
            path: '/Post/UserDetail',
            name: 'FollowDetailPage',
            component: () => import('../components/Follow/FollowDetailPage.vue')
        },
        //에러페이지
        {
            path: '/Error',
            name: 'Error',
            component: () => import('../components/Common/Error.vue')
        },
    ]

    const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes
    })

export default router
