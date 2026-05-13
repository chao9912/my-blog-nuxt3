<template>
  <section class="rounded-xl border border-slate-100 bg-white p-5 lg:p-6">
    <div class="relative grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_200px]">
      <div>
        <h2 class="text-base font-bold text-slate-900 lg:text-lg">个人简介</h2>

        <div class="mt-4 space-y-2.5 text-sm leading-7 text-slate-700 lg:text-base lg:leading-8">
          <p>热爱产品设计与用户体验，专注于用户需求和产品解决实际问题。</p>
          <p>热爱产品设计与用户体验，专注于用户需求和产品解决实际问题。</p>
          <p>喜欢记录生活中的点滴，分享所思所想，期待与更多有趣的人相遇。</p>
        </div>
      </div>

      <div class="relative hidden lg:flex items-center justify-center">
        <div class="relative">
          <div class="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-100/50 to-transparent"></div>
          <img
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=minimalist%203d%20illustration%20of%20stacked%20books%20with%20a%20small%20potted%20plant%20on%20top%20clean%20simple%20style%20blue%20tones%20white%20background&image_size=portrait_4_3"
            alt="books illustration"
            loading="lazy"
            class="relative w-full max-w-[160px] h-auto rounded-xl"
          />
        </div>
      </div>
    </div>
  </section>
</template>
