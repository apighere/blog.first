module.exports = {
    title: '猪的博客',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/qq1.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    themeConfig: {
      logo: '/qq1.jpg',  // 左上角logo
      nav:[ // 导航栏配置
        {text: '首页', link: '/' },
        //{text: '技术文档', link: '/tech/interview/' },
        //{text: '简书主页', link: 'https://www.jianshu.com/u/0ce18d709dd5'}      
      ],
      sidebar: 'auto', // 侧边栏配置
    }
  };