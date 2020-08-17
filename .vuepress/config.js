module.exports = {
  title: "QiJieH\'s Blog",
  description: "Blog HTML CSS C++ C Java Python DataBase MySQL Vuepress FrontEnd technology",
  base: "/blog/",
  dest: ".vuepress/dist",
  head: [
    ["link", { rel: "icon", href: "/web-img/author.jpg"}],
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no"}],
    ["script", { src: "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"}],
    ["script", { src: "/js/MouseClickEffect.js" }],
    ["script", { src: "/js/HeroVideo.js" }]
  ],

  theme: "reco",
  themeConfig: {
    nav: [
      // {
      //   "text": "Home",
      //   "link": "/",
      //   "icon": "reco-home"
      // },
      // {
      //   "text": "TimeLine",
      //   "link": "/timeline/",
      //   "icon": "reco-date"
      // },
      {
        "text": "Github",
        "link": "https://github.com/QiJieH",
        "icon": "reco-github",
      }
    ],


    sidebar: "auto",
    type: "blog",
    blogConfig: {
    //   "category": {
    //     "location": 2,
    //     "text": "Category"
    //   },
    //   "tag": {
    //     "location": 3,
    //     "text": "Tag"
    //   }
    },
    friendLink: [
      // {
      //   "title": "午后南杂",
      //   "desc": "Enjoy when you can, and endure when you must.",
      //   "email": "1156743527@qq.com",
      //   "link": "https://www.recoluan.com"
      // },
      // {
      //   "title": "vuepress-theme-reco",
      //   "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      //   "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   "link": "https://vuepress-theme-reco.recoluan.com"
      // }
      {
        "title": "MXBlog",
        "desc": "暗黑风现代化设计Blog",
        "link": "http://www.ymxblog.com/"
      }
    ],
    logo: "/web-img/author.jpg",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "QiJieH",
    authorAvatar: "/web-img/author.jpg",
    // 网站更新记录
    record: "1.0.2",
    recordLink: "/record/",

    startYear: "2020",
    modePicker: true, // 默认 true，false 不显示模式调节按钮，true 则显示
    mode : 'light', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    noFoundPageByTencent: false,
    valineConfig: {
      appId: process.env.VALINEID,
      appKey: process.env.VALINEKEY
    }
  },
  plugins: [
    [
      // https://github.com/moefyit/vuepress-plugin-meting
      "meting", {
        meting: {
          auto: "https://music.163.com/#/playlist?id=5156784198"
        },
        aplayer: {
          lrcType: 0
        },
        mobile: {
          cover: false
        }
      }
    ],
    [
      // https://www.vuepress.cn/plugin/official/plugin-pwa.html
      '@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    ],
    [ // https://www.npmjs.com/package/vuepress-plugin-nuggets-style-copy
      "vuepress-plugin-nuggets-style-copy", {
        copyText: "copy",
        tip: {
          content: "复制成功!"
        }
      }
    ],
    [
      // https://github.com/ulivz/vuepress-plugin-flowchart
      'flowchart'
    ],
    [
      // 禁用加载页面
      '@vuepress-reco/vuepress-plugin-loading-page',false
    ],
    // 使用 themeConfig 配置，否则无法正常加载浏览量
    // [
    //   // reco 自带评论插件
    //   // https://vssue.js.org/zh/guide/
    //   // https://valine.js.org/
    //   '@vuepress-reco/comments', {
    //     solution: 'valine',
    //     options: {
    //       appId: process.env.VALINEID,
    //       appKey: process.env.VALINEKEY
    //     }
    //
    //     // solution: 'vssue',
    //     // options: {
    //     //   platform: 'github',
    //     //   owner: 'QiJieH',
    //     //   repo: 'blog',
    //     //   clientId: process.env.VSSUEID,
    //     //   clientSecret: process.env.VSSUESECRET,
    //     // }
    //   }
    // ],
    [
      // https://github.com/tolking/vuepress-plugin-img-lazy
      'img-lazy'
    ],
    [ 
      // https://vuepress.github.io/zh/plugins/copyright/
      'copyright',
      {
        disabled: true,
        // can frontmatter setting
        // noCopy: false,
        // noSelect: false,
        // minLength: 0
      },
    ],
    [
      // https://vuepress.github.io/zh/plugins/smooth-scroll
      'vuepress-plugin-smooth-scroll'
    ],

  ],
  markdown: {
    lineNumbers: false,
    extendMarkdown: md => {
      md.use(require('markdown-it-imsize'))
    }
  }
}