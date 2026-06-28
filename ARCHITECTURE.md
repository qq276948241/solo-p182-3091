# 社区周末农贸市集浏览站 · 架构说明

## 这是个什么站

小区每月最后一个周末在中心广场办一次农贸市集，居民想提前看看这周有哪些摊位、卖什么、摊主是谁，于是就有了这个站。三个页面支撑起全部体验：首页摆着所有摊位卡片，点进去看详情，遇到喜欢的就收藏起来下次直奔主题。没有后端，没有登录，数据全在本地 JSON 里，收藏也存在浏览器本地，打开就能用。

## 用户进来会怎么走

想象一位居民周五晚上想起周末市集，打开网站。首先映入眼帘的是顶部的倒计时横幅，醒目地告诉他「距离下次市集还有 2 天 5 小时 32 分」，下面紧跟着具体日期和地点。再往下是大标题和一句温馨的介绍，告诉他这里有农户清晨摘的蔬菜、手艺人做的小物、还有烘焙师凌晨出炉的面包。

接着他会看到搜索框，想找上周那家卖好吃曲奇的，搜「饼干」两个字，卡片列表立刻就缩成了一家。或者他只想看蔬菜区，点一下「🥬 蔬菜」标签，6 个蔬菜摊位整整齐齐排在眼前。

看到感兴趣的卡片，点进去就是详情页。左边是摊位介绍和本周供应的货品卡片，右边侧边栏粘着营业时间、地点、摊主照片和一句摊主的话。右上角那颗心形按钮点一下，土黄色填满，这就收藏上了。

想看看都收藏了哪些，点导航栏的「我的收藏」。横向卡片一条条列着，能直接跳转详情，也能移除。空状态还会引导他回去逛逛。

## 数据从哪来，到哪去

所有摊位数据躺在 [src/data/stalls.json](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/data/stalls.json) 里，15 条记录覆盖蔬菜、手作、烘焙三个品类，每条有摊位介绍、摊主信息、3 到 6 件货品。类型定义在 [src/types/stall.ts](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/types/stall.ts)，`Category`、`Product`、`Stall` 三个接口把数据结构钉得明明白白，任何地方用 stall 都是强类型。

数据从 JSON 进来，先到页面。首页 [Home.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/pages/Home.tsx) 把它 import 进来，用 `useMemo` 结合搜索关键词和品类筛选过滤出结果，传给 `StallCard` 组件渲染成网格。点卡片跳转到 [StallDetail.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/pages/StallDetail.tsx)，从路由参数里拿 `id`，在 stalls 数组里 `find` 出对应的那一条，展示它的全部信息，包括用 `ProductCard` 渲染的货品列表。

收藏状态不跟 JSON 混，由 [src/store/useFavoriteStore.ts](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/store/useFavoriteStore.ts) 独立管理。这是个 Zustand store，用 `persist` 中间件把收藏的摊位 ID 数组存在 `localStorage` 里，关掉浏览器再打开也还在。它对外暴露 `isFavorite`、`toggleFavorite`、`addFavorite`、`removeFavorite` 四个方法，任何组件想用，调一下 `useFavoriteStore` 就行。`StallCard` 右上角的心形按钮、`StallDetail` 侧边栏的收藏按钮、`Favorites` 页的移除按钮，都是在跟它打交道。

## 组件们怎么搭起来的

最外层是 [App.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/App.tsx)，包着 `BrowserRouter`，里面先放 `Navbar`，再是三个路由：`/` 给首页，`/stall/:id` 给详情页，`/favorites` 给收藏列表，不认识的路径一律重定向回首页。最底下是 `Footer`，写着「每月最后一个周末 · 中心广场见」。

[Navbar.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/components/Navbar.tsx) 站最顶上，粘着导航。左边是品牌 Logo 和「周末农贸市集」的衬线字体标题，中间显示「本月 · 最后一个周末」，右边是「全部摊位」和「我的收藏」两个按钮。收藏按钮上有个小圆徽章，显示当前收藏了多少个，这个数字从 `useFavoriteStore` 里拿。

往下是三个页面，每个页面又用着各自的组件。首页 [Home.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/pages/Home.tsx) 最上面是刚加的倒计时横幅 [MarketBanner.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/components/MarketBanner.tsx)，显示距离开集还有多久。再往下是英雄标题区、搜索筛选区、卡片网格。卡片网格用的是 [StallCard.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/components/StallCard.tsx)，每张卡片上有摊位图、品类标签、名称、简介、位置、货品数量，还有右上角那颗爱心。

详情页 [StallDetail.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/pages/StallDetail.tsx) 是左右两栏布局。左边占大头，先是摊位大图，接着是介绍文字，然后是本周供应的货品网格，货品卡片由 [ProductCard.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/components/ProductCard.tsx) 负责，展示货品图、名称、单价、备注标签。最下面还推荐三个同品类的摊位，用的也是 `StallCard`。右边侧边栏粘着摊位信息卡和摊主信息卡，随时能点收藏。

收藏页 [Favorites.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/pages/Favorites.tsx) 最直接，从 `useFavoriteStore` 拿到所有收藏的 ID，去 stalls 数组里把它们捞出来，横向卡片一条条列着。如果一个都没收藏，就显示空状态引导他回去逛逛。

## 时间倒计时怎么算的

横幅上跳动的倒计时，背后是 [src/hooks/useNextMarket.ts](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/hooks/useNextMarket.ts)。这个自定义 hook 负责两件事：算出「每月最后一个周末」具体是哪两天，以及每秒刷新倒计时。

算法不复杂：拿本月最后一天，看它是星期几，往前回推到周六，就是最后一个周末的开始。如果今天已经过了本月市集（周日 18:00 之后），就自动算下个月的。时间判断里还区分了「正在开集」「今天开集还没开始」「还有几天」三种状态，横幅会据此显示不同的文案和呼吸灯效果。

它用 `useRef` 存定时器 ID，配合 `visibilitychange` 事件监听——用户切到别的标签页，浏览器会把定时器节流，切回来立刻手动刷新一次，保证时间不会飘。`marketInfo`、`countdown`、`dateText` 三个值全是 `useMemo` 派生出来的，从单一的 `now` 状态计算得到，避免多次 setState 互相打架。

## 样式系统怎么长这样

整个站的视觉语言由 [tailwind.config.js](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/tailwind.config.js) 和 [src/index.css](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/index.css) 共同定义。

配色是三套：米白 `cream` 做底，深绿 `forest` 做主色，土黄 `mustard` 当点缀。字体也是两套衬线体：中文用 Noto Serif SC，英文和数字用 Lora，标题再加粗一点。卡片圆角统一 2xl，阴影分 `card` 和 `cardHover` 两档，hover 上去轻微上浮加阴影加深。

所有复用的样式类在 `index.css` 里用 `@layer components` 抽成了 `.btn-primary`、`.btn-secondary`、`.card-base`、`.chip`、`.input-field` 这些原子组件类，改一个地方全站生效。背景还有两层淡淡的径向渐变，米白底色不单调。

工具方法只有一个 `cn()` 函数在 [src/lib/utils.ts](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/lib/utils.ts)，把 `clsx` 和 `tailwind-merge` 包了一下，用来动态拼类名。

## 下次想改东西去哪找

想改市集规则（比如改成双周一次，或者只开周六一天），碰 [useNextMarket.ts](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/hooks/useNextMarket.ts) 里的 `computeNextMarketDate` 就行。想改收藏的存储方式（比如同步到云端），去 [useFavoriteStore.ts](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/store/useFavoriteStore.ts) 换中间件。想加新的品类，先在 [stall.ts](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/types/stall.ts) 里加类型，再去 [Home.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/pages/Home.tsx) 的 `FILTERS` 数组里加个标签，最后在 [StallCard.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/components/StallCard.tsx) 和 [MarketBanner.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/src/components/MarketBanner.tsx) 里补一下对应的配色。想换配色，改 [tailwind.config.js](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo182/project182/tailwind.config.js) 里那三个色板就行。
