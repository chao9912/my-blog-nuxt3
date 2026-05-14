import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const tags = ['旅行', '生活', '美食', '随拍', '宠物', '工作', '运动', '音乐', '电影', '科技']
const categories = ['all', 'photo', 'video', 'mixed']

function randomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function generateMoments(count: number) {
  const moments = []
  const today = new Date()
  
  for (let i = 1; i <= count; i++) {
    const daysAgo = randomInt(0, 365)
    const date = new Date(today)
    date.setDate(date.getDate() - daysAgo)
    
    const isVideo = Math.random() > 0.7
    const category = isVideo ? 'video' : randomItem(['photo', 'mixed', 'all'])
    
    moments.push({
      title: getTitle(i),
      desc: getDesc(i),
      cover: `https://picsum.photos/seed/moment${i}/400/300`,
      tag: randomItem(tags),
      date: formatDate(date),
      likes: randomInt(10, 200),
      comments: randomInt(2, 50),
      views: randomInt(50, 500),
      isVideo,
      duration: isVideo ? getDuration() : null,
      category,
      mediaUrls: getMediaUrls(i, isVideo)
    })
  }
  
  return moments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function getTitle(index: number): string {
  const titles = [
    '春日樱花盛开', '夏日海边度假', '秋日枫叶红了', '冬日暖阳午后',
    '徒步山间小路', '城市夜景随拍', '美食探店打卡', '宠物日常萌态',
    '晨跑健身打卡', '阅读时光分享', '工作项目总结', '音乐演唱会',
    '电影观后感', '科技新品体验', '美食DIY制作', '旅行风景记录',
    '家庭聚会时光', '朋友小聚欢乐', '周末露营野餐', '书店咖啡时光',
    '摄影作品分享', '手账日记记录', '烘焙甜品制作', '园艺绿植养护',
    '书法练字日常', '绘画创作分享', '乐器练习打卡', '舞蹈视频记录',
    '瑜伽冥想时光', '烹饪美食教程', '旅行vlog分享', '生活小确幸',
    '学习打卡日常', '工作效率提升', '健康生活方式', '数码产品测评',
    '美食探店推荐', '自然风光摄影', '城市街头随拍', '宠物成长记录',
    '节日庆祝活动', '运动健身日常', '文化艺术展览', '音乐推荐分享'
  ]
  return titles[(index - 1) % titles.length]
}

function getDesc(index: number): string {
  const descs = [
    '美好的时光总是过得很快，记录一下这个难忘的瞬间...',
    '阳光正好，微风不燥，享受这惬意的时刻~',
    '生活中的小确幸，值得被记录和珍藏...',
    '今天又是充实的一天，收获满满！',
    '和朋友们一起度过了愉快的时光，开心！',
    '一个人独处的时光，也可以很美好...',
    '尝试了新事物，感觉很棒！',
    '大自然的美景总是让人心情愉悦...',
    '努力工作，认真生活，每一天都值得珍惜！',
    '周末时光，放松身心，享受生活~',
    '美食治愈一切，今天也要好好吃饭！',
    '运动让我充满活力，继续加油！',
    '阅读让我开阔眼界，增长知识~',
    '音乐陪伴我度过了很多美好的时光...',
    '电影带给我很多思考和感动...',
    '科技改变生活，让我们的生活更便捷...',
    '旅行让我看到了不一样的世界...',
    '宠物是最好的伙伴，给我带来很多快乐！',
    '工作虽然忙碌，但也很充实...',
    '生活中的点点滴滴，都是珍贵的回忆...',
    '春天来了，万物复苏，充满希望！',
    '夏天的阳光，热情而温暖...',
    '秋天的落叶，美得像一幅画...',
    '冬天的雪景，银装素裹，美不胜收...',
    '清晨的第一缕阳光，新的一天开始了！',
    '夜晚的星空，璀璨而神秘...',
    '城市的繁华，夜晚的霓虹灯闪烁...',
    '乡村的宁静，让人感到心旷神怡...',
    '海边的浪花，一波又一波...',
    '山间的云雾，如梦如幻...',
    '咖啡馆的温馨，适合发呆和思考...',
    '书店的安静，让人沉浸在书的世界...',
    '公园的悠闲，散步、跑步、晒太阳...',
    '健身房的汗水，换来健康的身体...',
    '厨房的烟火气，家的味道...',
    '画室的创作，表达内心的想法...',
    '琴房的琴声，悠扬而动听...',
    '舞蹈室的律动，释放活力...',
    '瑜伽馆的宁静，放松身心...',
    '工作室的专注，创造价值...',
    '会议室的讨论，头脑风暴...',
    '舞台上的表演，闪耀光芒...'
  ]
  return descs[(index - 1) % descs.length]
}

function getDuration(): string {
  const minutes = randomInt(0, 5)
  const seconds = randomInt(0, 59)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function getMediaUrls(index: number, isVideo: boolean): string {
  if (isVideo) {
    return `https://example.com/video/moment${index}.mp4`
  }
  const count = randomInt(1, 4)
  const urls = []
  for (let i = 1; i <= count; i++) {
    urls.push(`https://picsum.photos/seed/moment${index}-${i}/800/600`)
  }
  return urls.join(',')
}

async function main() {
  await prisma.moment.deleteMany()
  
  const moments = generateMoments(42)
  
  for (const moment of moments) {
    await prisma.moment.create({
      data: moment
    })
  }

  console.log('42条动态数据已成功创建！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
