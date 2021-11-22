const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const x = localStorage.getItem('x')  //去localStorage中获取x
const xObject = JSON.parse(x)        //将字符串x转换成对象

/*将xObject赋值给hashMap，如果xObject为空，则初始化一个*/
const hashMap = xObject || [
    {logo: 'A' , logoType: 'text' , url : 'https://www.acfun.cn/'},
    {logo: 'B' , logoType: 'icon' , url : 'https://bilibili.com/'},
]

/*遍历hashMap，且生成一个li；forEach会将每一项作为参数告诉你，node就是接收到的参数*/
const render = ()=>{
    $siteList.find('li:not(.last)').remove()  /*删除所有li，除了最后一个；否则会将原本存在的hash再推一遍*/
    hashMap.forEach(node=>{
        const $li = $(`
        <li>
            <a href="${node.url}">      <!--${node.url}非jQuery语法-->
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${node.url}</div>
            </div>
            </a>
        </li>
    `).insertBefore($lastLi);
    });
}

render()

/*点击时向hashMap中推入键值对*/
$('.addButton')
    .on('click',()=>{
       let url =window.prompt('请输入网址')
        if (url.indexOf('http')!==0){
            url = 'https://' + url
        }
        hashMap.push({
            logo: url[0] ,
            logoType: 'text' ,
            url: url}
            );

        /*新增后，需再次渲染hashMap，所以再遍历一遍*/
        render()
});

/*在离开页面前，将hashMap存入localStorage中*/
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}