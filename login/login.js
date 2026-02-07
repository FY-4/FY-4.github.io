// HTML模板
const loginModalHTML = `
    <div id="loginModal" class= "modal">
        <div class="main-right-login">
            <div class="form-container-login">
                <h2 class="required-note-login">Login Interface</h2>

                <form class="simple-form-login">
                    <div class="form-field-login">
                        <label>User ID:</label>
                        <input type="text" required id="username1" placeholder="The username is your student ID">
                    </div>

                    <div class="form-field-login">
                        <label>Secret Key:</label>
                        <input type="password" required id="secretkey2" placeholder="Last four digits of username">
                    </div>

                    <div class="form-field-login">
                        <label>Your Email:</label>
                        <input type="email" required id="email3" placeholder="student ID plus @hbut.edu.cn">
                    </div>

                    <div class="welcome-text-login">
                        <p>Hi 👋 I welcome you to this website . Hope you enjoy browsing</p>
                    </div>
                    <div class="form-buttons-login">
                            <button type="button" class="cancel-btn-login" id="cancelBtn-login">Cancel</button>
                            <button type="login" class="login-btn-login" id="loginBtn-login">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;

// info模态框HTML模板
const infoModalHTML = `
    <div id="loginModal" class= "modal">
        <div class="main-right-login">
            <div class="form-container-login">
                <h2 class="required-note-login">Login Interface</h2>

                <form class="simple-form-login">
                    <div class="form-field-login">
                        <label>User ID:</label>
                        <input type="text" required id="username1" placeholder="The username is your student ID">
                    </div>

                    <div class="form-field-login">
                        <label>Secret Key:</label>
                        <input type="password" required id="secretkey2" placeholder="Last four digits of username">
                    </div>

                    <div class="form-field-login">
                        <label>Your Email:</label>
                        <input type="email" required id="email3" placeholder="student ID plus @hbut.edu.cn">
                    </div>

                    <div class="welcome-text-login">
                        <p>Hi 👋 I welcome you to this website . Hope you enjoy browsing</p>
                    </div>
                    <div class="form-buttons-login">
                            <button type="button" class="cancel-btn-login" id="cancelBtn-login">Cancel</button>
                            <button type="login" class="login-btn-login" id="loginBtn-login">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;

// 搜索模态框HTML模板 - 简洁版
const searchModalHTML = `
    <div id="searchModal" class="modal search-modal">
        <div class="search-dropdown">
            <div class="search-header">
                <i class="fas fa-search search-icon"></i>
                <input type="text" 
                       id="searchInput" 
                       class="search-input" 
                       placeholder="搜索网站内容..."
                       autocomplete="off">
                <button class="search-close-btn" id="searchCloseBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-results-container">
                <ul class="search-results-list" id="searchResultsList">
                    <!-- 搜索结果将动态插入这里 -->
                </ul>
                <div class="search-empty" id="searchEmpty">
                    <i class="fas fa-search"></i>
                    <p>输入关键词搜索相关内容</p>
                </div>
            </div>
        </div>
    </div>
`;

// loginstate = 0 代表没有登陆过
// 需要做的两件事情是，创建注册登录页面
let loginstate = parseInt(sessionStorage.getItem('loginstate')) || 0;
let logincodes = [
    { username: "2310110215", secretkey: "0215", email: "2310110215@hbut.edu.cn" },
    { username: "2310110415", secretkey: "0415", email: "2310110415@hbut.edu.cn" },
    { username: "2310110313", secretkey: "0313", email: "2310110313@hbut.edu.cn" },
    { username: "2310110223", secretkey: "0223", email: "2310110223@hbut.edu.cn" }
]

// 模拟搜索结果
    const allPages = [
        { title: "基本介绍", url: "./introduction.html", icon: "fas fa-info-circle",keywords:["基本", "介绍", "概述", "简介", "产品介绍", "功能", "特点"] },
        { title: "视频介绍", url: "./video.html", icon: "fas fa-video" ,keywords: ["视频", "演示", "操作视频", "功能演示", "展示", "录像"]},
        { title: "参数设计", url: "./calculate.html", icon: "fas fa-calculator",keywords: ["参数", "设计", "计算", "技术参数", "规格", "技术规格", "设计参数"] },
        { title: "资料下载", url: "./download.html", icon: "fas fa-download",keywords: ["资料", "下载", "文档", "文件", "说明书", "手册", "技术文档"] },
        { title: "服务与支持", url: "./service.html", icon: "fas fa-headset" ,keywords: ["服务", "支持", "维修", "售后", "客服", "帮助", "技术支持", "维护"]},
        { title: "联系方式", url: "./contact.html", icon: "fas fa-address-book", keywords: ["联系", "方式", "地址", "电话", "邮箱", "联系我们", "联系信息"] },
        { title: "商城", url: "./shopping.html", icon: "fas fa-shopping-cart" ,keywords: ["商城", "购物", "购买", "商品", "产品", "商店", "在线购买","价格"]},
        { title: "未来开发", url: "#", icon: "fas fa-rocket",keywords: ["未来", "开发", "计划", "规划", "即将", "后续", "下一步"] }
    ];

window.onload = function () {
    let loginSuccessUser = this.sessionStorage.getItem("userInfo");
    let loginicon = document.getElementsByClassName("icon-link-login")[0]
    let searchicon = document.getElementsByClassName("icon-link-search")[0]
    console.log("loginicon:", loginicon)
    console.log("searchicon:", searchicon)

    loginicon.addEventListener("click", function () {

        if (loginstate == 0) {
            if (!document.getElementsByClassName("loginnode")[0]) {
                var loginnode = document.createElement("div")
                loginnode.innerHTML = loginModalHTML
                loginnode.className = "loginnode"
                document.body.appendChild(loginnode)
                document.getElementById("loginModal").style.display = "block";

                // 取消按钮
                var cancelBtn = document.getElementById("cancelBtn-login");
                cancelBtn.addEventListener("click", function () {
                    document.getElementById("loginModal").style.display = "none";
                    // 此时选择了取消按钮，登录状态还是0
                    loginstate = 0;
                });

                // 登录按钮

                var loginBtn = document.getElementById("loginBtn-login");
                loginBtn.addEventListener("click", function () {

                    // 每次点击login之前都恢复样式
                    document.getElementsByClassName("form-field-login")[0].getElementsByTagName("input")[0].style.border = "1px solid #ccc"
                    document.getElementsByClassName("form-field-login")[1].getElementsByTagName("input")[0].style.border = "1px solid #ccc"
                    document.getElementsByClassName("form-field-login")[2].getElementsByTagName("input")[0].style.border = "1px solid #ccc"

                    var username = parseInt(document.getElementById("username1").value);
                    var secretkey = document.getElementById("secretkey2").value.toString();
                    var email = document.getElementById("email3").value.toString();
                    if (username == "" || secretkey == "" || email == "") {
                        alert("Please fill in all fields correctly.");
                    }
                    else {
                        var username_index = -1;

                        for (let i = 0; i < logincodes.length; i++) {
                            if (username == logincodes[i].username) {
                                username_index = i;
                            }
                        }
                        if (username_index != -1) {
                            console.log("用户名正确")
                            if (secretkey == logincodes[username_index].secretkey) {
                                console.log("密码正确")
                                if (email == logincodes[username_index].email) {
                                    sessionStorage.setItem('loginstate', "1");
                                    // 保存用户信息到sessionStorage
                                    sessionStorage.setItem('userInfo', JSON.stringify({
                                        username: username,
                                        secretkey: secretkey,
                                        email: email
                                    }));
                                    alert("Login successful");
                                    document.getElementById("loginModal").style.display = "none";
                                    username.innerHTML = "none"
                                    secretkey.innerHTML = "none"
                                    email.innerHTML = "none"
                                    console.log("登陆成功")
                                    username_index = -1;
                                    updateUserIconAfterLogin();



                                }
                                else {
                                    console.log("邮箱错误")
                                    var emailinput = document.getElementsByClassName("form-field-login")[2].getElementsByTagName("input")[0]
                                    emailinput.style.border = "1px solid red"

                                    // document.getElementById("username1").value = ""
                                    // document.getElementById("secretkey2").value = ""
                                    // document.getElementById("email3").value = ""
                                    username_index = -1;
                                }
                            }
                            else {
                                console.log("密码错误")
                                var secretkeyinput = document.getElementsByClassName("form-field-login")[1].getElementsByTagName("input")[0]
                                secretkeyinput.style.border = "1px solid red"

                                // document.getElementById("username1").value = ""
                                // document.getElementById("secretkey2").value = ""
                                // document.getElementById("email3").value = ""
                                username_index = -1;
                            }
                        }
                        else {
                            console.log("用户名错误")
                            var usernameinput = document.getElementsByClassName("form-field-login")[0].getElementsByTagName("input")[0]
                            usernameinput.style.border = "1px solid red"

                            // document.getElementById("username1").value = ""
                            // document.getElementById("secretkey2").value = ""
                            // document.getElementById("email3").value = ""
                            username_index = -1;
                        }

                    }
                });
            }
            else {
                document.getElementById("loginModal").style.display = "block";
            }
        }
    });

    if (loginstate == 1) {
        // 等待DOM加载完成后再执行
        setTimeout(updateUserIconAfterLogin, 100);

        var nowuserJsonStr = sessionStorage.getItem('userInfo');
        nowuserJsonStr_info = JSON.parse(nowuserJsonStr)
        console.log(nowuserJsonStr_info.username)
        console.log(nowuserJsonStr_info.secretkey)
        console.log(nowuserJsonStr_info.email)
    }

    // search功能实现
    searchicon.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation(); // 阻止事件冒泡

        // 如果搜索模态框已存在，切换显示状态 这里是搜索框已经创建的情况，如果没创建在return后面
        let existingSearchModal = document.querySelector('#searchModal');
        if (existingSearchModal) {
            if (existingSearchModal.style.display === "block") {
                existingSearchModal.style.display = "none";
            } else {
                existingSearchModal.style.display = "block";
                // 这里我们把焦点放在输入框上，毕竟我们总是需要输入信息的吧
                setTimeout(() => {
                    document.getElementById("searchInput").focus();
                }, 100);
            }
            return;
        }

        // 模仿loginnode创造一个searchnode
        var searchnode = document.createElement("div")
        searchnode.innerHTML = searchModalHTML
        searchnode.className = "searchnode"
        document.body.appendChild(searchnode)

        document.getElementById("searchModal").style.display = "block";

        // 聚焦搜索输入框
        setTimeout(() => {
            document.getElementById("searchInput").focus();
        }, 100);

        // 绑定关闭按钮事件
        document.getElementById("searchCloseBtn").addEventListener('click', function (e) {
            e.stopPropagation();
            document.getElementById("searchModal").style.display = "none";
        });

        // 绑定输入框输入事件 使用js独特的this.value.trim 表示输入框的值然后移除字符串首尾的空格换行等等
        document.getElementById("searchInput").addEventListener('input', function () {
            performSearch(this.value.trim());
        });

        // 绑定输入框回车事件 类似绑定输入事件
        document.getElementById("searchInput").addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && this.value.trim()) {
                performSearch(this.value.trim());
            }
        });

        // 隐藏我们的输入控件
        document.getElementById("searchModal").addEventListener('click', function (e) {
            if (e.target.id === 'searchModal') {
                document.getElementById("searchModal").style.display = "none";
            }
        });

        // 初始显示空状态
        showEmptyState();
    });
}

// 登录逻辑的实现
function updateUserIconAfterLogin() {
    const iconMenu = document.querySelector('.icon-menu');
    if (!iconMenu) return;

    // 找到用户图标元素
    const userIcon = document.querySelector('.icon-link-login');
    if (!userIcon) return;

    // 替换为下拉菜单HTML
    userIcon.outerHTML = `
        <div class="user-dropdown-container" style="position: relative; display: inline-block;">
            <a href="#" class="icon-link-login" id="user-icon-trigger" style="display: flex; align-items: center;">
                <i class="fas fa-user"></i>
                <i class="fas fa-caret-down" style="margin-left: 5px; font-size: 12px;"></i>
            </a>
            <div class="user-dropdown-menu" style="position: absolute; top: 100%; right: 0; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 4px; padding: 10px 0; min-width: 120px; z-index: 10001; display: none;">
                <a href="#" class="dropdown-item" id="my-info" style="display: block; padding: 8px 15px; color: #333; text-decoration: none; transition: background-color 0.3s;">我的信息</a>
                <a href="#" class="dropdown-item" id="logout" style="display: block; padding: 8px 15px; color: #333; text-decoration: none; transition: background-color 0.3s;">退出登录</a>
            </div>
        </div>
    `;

    // 绑定下拉菜单事件
    const dropdownContainer = document.querySelector('.user-dropdown-container');
    const dropdownTrigger = document.getElementById('user-icon-trigger');
    const dropdownMenu = document.querySelector('.user-dropdown-menu');

    if (dropdownTrigger && dropdownMenu) {
        // 鼠标移入显示下拉菜单
        dropdownContainer.addEventListener('mouseenter', function () {
            dropdownMenu.style.display = 'block';
        });

        // // 鼠标移出图标时延迟隐藏菜单
        // dropdownTrigger.addEventListener('mouseleave', function() {
        //     hideTimer = setTimeout(function() {
        //         dropdownMenu.style.display = 'none';
        //     }, 1000); // 给用户时间移动到菜单
        // });

        // // 鼠标移出菜单时取消延迟隐藏
        // dropdownMenu.addEventListener('mouseleave', function() {
        //     dropdownMenu.style.display = 'none';
        // });

        // dropdownContainer.addEventListener('mouseenter', function() {
        //     clearTimeout(hideTimer);
        // });


        // 我的信息点击事件
        const myInfoBtn = document.getElementById('my-info');
        if (myInfoBtn) {
            myInfoBtn.addEventListener('click', function (e) {
                e.preventDefault();
                // 从sessionStorage获取用户信息
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

                // 创建信息模态框
                let infoNode = document.createElement('div');
                infoNode.className = 'infonode';
                // 使用loginModalHTML模板，但我们需要修改
                infoNode.innerHTML = infoModalHTML;

                // 添加到body
                document.body.appendChild(infoNode);

                // 获取模态框元素
                let modal = infoNode.querySelector('#loginModal');
                modal.style.display = 'block';

                // 修改标题
                let title = modal.querySelector('.required-note-login');
                title.textContent = 'My Information';

                // 修改欢迎文本
                let welcomeText = modal.querySelector('.welcome-text-login p');
                welcomeText.textContent = 'Your personal information is displayed below';

                // 获取输入框
                let usernameInput = modal.querySelector('#username1');
                let secretkeyInput = modal.querySelector('#secretkey2');
                let emailInput = modal.querySelector('#email3');

                // 设置输入框为只读，并填充数据
                usernameInput.value = userInfo.username;
                usernameInput.readOnly = true;
                secretkeyInput.value = userInfo.secretkey;
                secretkeyInput.readOnly = true;
                emailInput.value = userInfo.email;
                emailInput.readOnly = true;

                // 修改按钮
                let cancelBtn = modal.querySelector('#cancelBtn-login');
                let loginBtn = modal.querySelector('#loginBtn-login');
                cancelBtn.textContent = 'Cancel';
                loginBtn.textContent = 'Logout';
                loginBtn.className = 'cancel-btn-login'; // 使用Cancel按钮的样式

                // 绑定Cancel按钮事件：关闭并移除模态框
                cancelBtn.addEventListener('click', function () {
                    modal.style.display = 'none';
                    document.body.removeChild(infoNode);
                });

                // 绑定Logout按钮事件
                loginBtn.addEventListener('click', function () {
                    if (confirm('Are you sure you want to logout?')) {
                        sessionStorage.setItem('loginstate', "0");
                        sessionStorage.removeItem('userInfo');
                        loginstate = 0;
                        alert('已退出登录');
                        location.reload();
                        document.body.removeChild(infoNode);
                    }
                });
            });
        };

        // 添加悬停效果
        myInfoBtn.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#f5f5f5';
        });
        myInfoBtn.addEventListener('mouseleave', function () {
            this.style.backgroundColor = 'transparent';
        });
    }

    // 退出登录点击事件
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            sessionStorage.setItem('loginstate', "0");
            loginstate = 0;
            alert('已退出登录');
            location.reload(); // 刷新页面恢复为登录前状态
        });

        // 添加悬停效果
        logoutBtn.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#f5f5f5';
        });
        logoutBtn.addEventListener('mouseleave', function () {
            this.style.backgroundColor = 'transparent';
        });
    }
}




// 执行搜索
function performSearch(keyword) {
    const searchResultsList = document.getElementById("searchResultsList");
    const searchEmpty = document.getElementById("searchEmpty");

    if (!keyword) {
        showEmptyState();
        return;
    }

    // 对搜索关键词进行小写处理，方便比较
    const keywordLower = keyword.toLowerCase();
    
    // 过滤搜索结果 - 支持标题和关键词匹配
    const filteredResults = allPages.filter(item => {
        // 检查标题是否包含关键词
        if (item.title.toLowerCase().includes(keywordLower)) {
            return true;
        }
        
        // 检查关键词数组中是否包含关键词
        if (item.keywords) {
            return item.keywords.some(kw => kw.toLowerCase().includes(keywordLower));
        }
        
        return false;
    });

    // 对搜索结果进行排序：标题完全匹配的排在最前面
    filteredResults.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(keywordLower);
        const bTitleMatch = b.title.toLowerCase().includes(keywordLower);
        
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        return 0;
    });

    displaySearchResults(filteredResults, keyword);
}

// 显示搜索结果
function displaySearchResults(results, keyword) {
    const searchResultsList = document.getElementById("searchResultsList");
    const searchEmpty = document.getElementById("searchEmpty");

    searchResultsList.innerHTML = '';

    if (results.length === 0) {
        searchEmpty.style.display = 'flex';
        searchEmpty.innerHTML = `
            <i class="fas fa-search"></i>
            <p>未找到与"${keyword}"相关的内容</p>
        `;
        return;
    }

    searchEmpty.style.display = 'none';

    results.forEach((result) => {
        const li = document.createElement('li');
        li.className = 'search-result-item';
        li.innerHTML = `
            <a href="${result.url}" class="search-result-link">
                <i class="${result.icon} result-icon"></i>
                <span class="result-title">${result.title}</span>
                <i class="fas fa-chevron-right result-arrow"></i>
            </a>
        `;

        // 添加点击事件，点击后关闭搜索框
        li.querySelector('a').addEventListener('click', function (e) {
            if (result.url === '#') {
                e.preventDefault();
                alert('暂未开发，后续将会开放');
            }
            setTimeout(() => {
                document.getElementById("searchModal").style.display = "none";
                document.getElementById("searchInput").value = '';
                showEmptyState();
            }, 100);
        });

        searchResultsList.appendChild(li);
    });
    
    // 显示匹配到的关键词
    showMatchedKeywords(results, keyword);
}

// 显示空状态
function showEmptyState() {
    const searchResultsList = document.getElementById("searchResultsList");
    const searchEmpty = document.getElementById("searchEmpty");

    searchResultsList.innerHTML = '';
    searchEmpty.style.display = 'flex';
    searchEmpty.innerHTML = `
        <i class="fas fa-search"></i>
        <p>请输入要搜索的关键词</p>
    `;
}

// 在页面其他位置点击时关闭搜索框
document.addEventListener('click', function (e) {
    const searchModal = document.getElementById("searchModal");
    const searchIcon = document.querySelector('.icon-link-search');

    if (searchModal && searchModal.style.display === "block") {
        // 这个用法在web的api中有详细介绍，专门用来判断元素是否包含某个元素
        const isClickInsideSearch = searchModal.contains(e.target);
        const isClickOnSearchIcon = searchIcon.contains(e.target);

        if (!isClickInsideSearch && !isClickOnSearchIcon) {
            searchModal.style.display = "none";
            document.getElementById("searchInput").value = '';
            showEmptyState();
        }
    }
});

function showMatchedKeywords(results, keyword) {
    const keywordLower = keyword.toLowerCase();
    
    results.forEach(result => {
        // 查找匹配的关键词
        const matchedKeywords = result.keywords ? 
            result.keywords.filter(kw => kw.toLowerCase().includes(keywordLower)) : [];
        
        // 如果有关键词匹配，可以添加一个提示（可选）
        if (matchedKeywords.length > 0 && !result.title.toLowerCase().includes(keywordLower)) {
            const li = searchResultsList.querySelector(`a[href="${result.url}"]`).parentElement;
            const titleSpan = li.querySelector('.result-title');
            titleSpan.innerHTML = `${result.title} <span class="keyword-hint">( ${matchedKeywords[0]})</span>`;
        }
    });
}
