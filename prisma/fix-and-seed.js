import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Deleting old data...')
  await prisma.moment.deleteMany({})
  console.log('Old data deleted!')

  // 使用完全内联的对象，避免任何编码问题
  const momentsData = [
    {
      title: "徒步千岛湖",
      desc: "阳光正好，微风不燥，一次治愈的旅行，感受大自然的美好...",
      cover: "https://picsum.photos/seed/moment1/400/300",
      tag: "旅行",
      date: "2024-05-20",
      likes: 28,
      comments: 6,
      views: 120,
      isVideo: false
    },
    {
      title: "午后阅读时光",
      desc: "一本好书，一杯咖啡，享受独处的时光，让心灵得到放松...",
      cover: "https://picsum.photos/seed/moment2/400/300",
      tag: "生活",
      date: "2024-05-18",
      likes: 31,
      comments: 9,
      views: 98,
      isVideo: false
    },
    {
      title: "日落海边漫步",
      desc: "吹着海风，看着日落，所有烦恼都随风而去...",
      cover: "https://picsum.photos/seed/moment3/400/300",
      tag: "生活",
      date: "2024-05-15",
      likes: 42,
      comments: 11,
      views: 156,
      isVideo: true,
      duration: "00:45"
    },
    {
      title: "自制健康晚餐",
      desc: "自己动手，健康美味，吃得开心最重要...",
      cover: "https://picsum.photos/seed/moment4/400/300",
      tag: "美食",
      date: "2024-05-12",
      likes: 26,
      comments: 7,
      views: 89,
      isVideo: false
    },
    {
      title: "城市晚霞",
      desc: "下班路上遇见的绝美晚霞，记录一下这个美好的瞬间...",
      cover: "https://picsum.photos/seed/moment5/400/300",
      tag: "随拍",
      date: "2024-05-10",
      likes: 35,
      comments: 8,
      views: 112,
      isVideo: false
    },
    {
      title: "小猫的可爱瞬间",
      desc: "我家小猫又在卖萌啦，太治愈了~",
      cover: "https://picsum.photos/seed/moment6/400/300",
      tag: "宠物",
      date: "2024-05-08",
      likes: 38,
      comments: 12,
      views: 145,
      isVideo: true,
      duration: "00:32"
    },
    {
      title: "露营看星星",
      desc: "逃离城市的喧嚣，拥抱大自然，满天繁星美不胜收...",
      cover: "https://picsum.photos/seed/moment7/400/300",
      tag: "旅行",
      date: "2024-05-05",
      likes: 44,
      comments: 14,
      views: 167,
      isVideo: false
    },
    {
      title: "项目攻坚完成！",
      desc: "又一个里程碑达成，继续加油！💪",
      cover: "https://picsum.photos/seed/moment8/400/300",
      tag: "工作",
      date: "2024-05-03",
      likes: 29,
      comments: 5,
      views: 78,
      isVideo: false
    },
    {
      title: "春日樱花",
      desc: "春天来了，樱花开得真美，记录一下这美好的季节...",
      cover: "https://picsum.photos/seed/moment9/400/300",
      tag: "随拍",
      date: "2024-04-28",
      likes: 52,
      comments: 18,
      views: 234,
      isVideo: false
    },
    {
      title: "晨跑打卡",
      desc: "坚持晨跑第30天，感觉身体越来越棒了！",
      cover: "https://picsum.photos/seed/moment10/400/300",
      tag: "生活",
      date: "2024-04-25",
      likes: 33,
      comments: 10,
      views: 145,
      isVideo: true,
      duration: "02:15"
    },
    {
      title: "周末烘焙",
      desc: "尝试做了提拉米苏，第一次做竟然成功了！",
      cover: "https://picsum.photos/seed/moment11/400/300",
      tag: "美食",
      date: "2024-04-20",
      likes: 47,
      comments: 15,
      views: 189,
      isVideo: false
    },
    {
      title: "读书分享",
      desc: "读完了《人类简史》，收获很多，推荐给大家！",
      cover: "https://picsum.photos/seed/moment12/400/300",
      tag: "生活",
      date: "2024-04-18",
      likes: 61,
      comments: 22,
      views: 312,
      isVideo: false
    }
  ]

  console.log('Inserting new data...')
  for (const data of momentsData) {
    const content = JSON.stringify(data)
    await prisma.moment.create({
      data: {
        content: content,
        images: []
      }
    })
  }

  console.log('Seed data created successfully!')
  
  // 验证一下插入的数据
  console.log('\nVerifying data:')
  const allMoments = await prisma.moment.findMany()
  for (const m of allMoments) {
    try {
      const parsed = JSON.parse(m.content)
      console.log(`- ${parsed.title}`)
    } catch (e) {
      console.log(`- Parse error: ${m.content}`)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
