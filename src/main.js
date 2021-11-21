$('.addButton')
    .on('click',()=>{
       let url =window.prompt('请输入网址')
        if (url.indexOf('http')!==0){
            url = 'https://' + url
        }
        const $siteList = $('.siteList')
        const $lastLi = $('li.last')
        const $li = $(`
            <li>
            <a href="${url}">   <!--${url}非jQuery语法-->
            <div class="site">
                <div class="logo">${url[0]}</div>
                <div class="link">${url}</div>
            </div>
            </a>
        </li>
        `).insertBefore($lastLi)
})