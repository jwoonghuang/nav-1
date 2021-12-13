const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const x = localStorage.getItem('x')  //去localStorage中获取x
const xObject = JSON.parse(x)        //将字符串x转换成对象

/*将xObject赋值给hashMap，如果xObject为空，则初始化一个*/
const hashMap = xObject || [
    {logo: 'A' , url : 'https://www.acfun.cn'},
    {logo: 'B' , url : 'https://bilibili.com'},
]

const simplifyUrl = (url) =>{
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')    //replace会把url变成新的字符串，但原本的url不会变，所以不能直接return url
        .replace(/\/.*/, '')    //删除/后面所有字符
}


/*遍历hashMap，且生成一个li；forEach会将每一项作为参数告诉你，node就是接收到的参数*/
const render = ()=>{
    $siteList.find('li:not(.last)').remove()  /*删除所有li，除了最后一个；否则会将原本存在的hash再推一遍*/
    hashMap.forEach((node,index)=>{
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo}</div>  <!--${node.logo}非jQuery语法-->
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="delete">
                    <svg class="icon">
                        <use xlink:href="#icon-jian"></use>
                    </svg>
                </div>
            </div>
        </li>
    `).insertBefore($lastLi);
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click', '.delete', (e)=>{
            e.stopPropagation()  //阻止冒泡，防止点击删除按钮时，点中li
            hashMap.splice(index,1)
            render()
        })
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
            logo: simplifyUrl(url)[0].toUpperCase() ,
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

// $(document).on('keypress', (e)=>{
//     const {key} = e   //等同于 const key = e.key
//     for(let i = 0; i<hashMap.length ;i++ ){
//         if (hashMap[i].logo.toLowerCase() === key){
//             window.open(hashMap[i].url)
//         }
//     }
// })


document.onmousedown = function(event){
    let vvv = event.target
    if(vvv.id === 'linshi'){
        console.log('yes')
    }else{
        console.log('no')
        $('#cover').on('keypress', (e)=>{
            const {key} = e   //等同于 const key = e.key
            for(let i = 0; i<hashMap.length ;i++ ){
                if (hashMap[i].logo.toLowerCase() === key){
                    window.open(hashMap[i].url)
                }
            }
        })
    }
}

// cover样式生成
function reset() {

    const hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
    
    function populate(a) {
      for ( let i = 0; i < 6; i++ ) {
        let x = Math.round( Math.random() * 14 );
        let y = hexValues[x];
        a += y;
      }
      return a;
    }
    
    let newColor1 = populate('#');
    let newColor2 = populate('#');
    let newColor3 = populate('#');
    let angle = Math.round( Math.random() * 360 );
    
    let gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ", " + newColor3 + ")";
    
    $('#cover').css({background : gradient});
    
  }

$('#reset').on('click', ()=>{
    reset()
})