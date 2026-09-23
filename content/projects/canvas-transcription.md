---
title: "Canvas Lecture Transcription & Captioning"
date: "2026-06-04"
status: "shipped"
category: "tools"
summary: "An automated pipeline that transcribes and captions Canvas LMS lecture videos, built to meet the ADA Title II / WCAG 2.1 AA caption-accuracy requirements universities face starting in 2026. It polls Canvas every 15 minutes for new uploads, then runs each video through a three-stage preprocessing pipeline before Whisper ever sees it: ffmpeg loudness normalization, noise reduction for stationary hum like HVAC or projector fans, and Silero voice-activity detection to strip dead air so Whisper doesn't hallucinate text into silence. That preprocessing measurably moves transcription accuracy from roughly 97% to 99% on typical lecture recordings — measured by automatically comparing its output word-for-word against a transcript I corrected by hand, not just eyeballed. The transcript then goes to Claude Haiku for structured notes, accurate WebVTT captions get posted back to replace Canvas's own inaccurate auto-captions, and a readable notes page gets created for students — all with zero workflow change required from instructors."
tags: ["whisper", "accessibility", "audio-processing", "canvas-lms"]
link: false
draft: false
---
