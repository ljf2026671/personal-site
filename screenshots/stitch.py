#!/usr/bin/env python3
# 将分段截图拼接为整页截图，并放大 2 倍
import os
from PIL import Image

base = r"C:\Users\a1394\DoubaoWork\chats\2026-10-27\new-chat\personal-site\screenshots"

# 页面信息
page_h = 6204      # 页面 CSS 高度
viewport = 960     # 每段视口 CSS 高度
segs_full = 6      # 前 6 段完整（seg00..seg05）

imgs = []
scale = None
for i in range(segs_full):
    p = os.path.join(base, "seg%02d.png" % i)
    im = Image.open(p).convert("RGB")
    if scale is None:
        scale = im.height / viewport
    imgs.append(im)

# 最后一段从 5760 到页面底 6204，即 444 CSS px，clip 出对应图片像素高度
last_start = segs_full * viewport
remain_css = page_h - last_start            # 444
remain_px = int(round(remain_css * scale))  # 对应图片像素高
p6 = os.path.join(base, "seg%02d.png" % segs_full)
im_last = Image.open(p6).convert("RGB")
im_last = im_last.crop((0, 0, im_last.width, remain_px))
imgs.append(im_last)

w = imgs[0].width
total_h = sum(im.height for im in imgs)
canvas = Image.new("RGB", (w, total_h), (5, 7, 13))
y = 0
for im in imgs:
    canvas.paste(im, (0, y))
    y += im.height

# 放大 2 倍
big = canvas.resize((w * 2, total_h * 2), Image.LANCZOS)
out = os.path.join(base, "personal-site-full.png")
big.save(out, "PNG")
print("full-page:", out, "size=", big.size, "bytes=", os.path.getsize(out))
