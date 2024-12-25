export const getVideoEmbedUrl = (url: string) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoID = url.includes("youtu.be")
      ? url.split("youtu.be/")[1].split("?")[0]
      : url.split("v=")[1].split("&")[0];

    return `https://www.youtube.com/embed/${videoID}`;
  } else if (url.includes("vimeo.com")) {
    const vimeoId = url.split("vimeo.com/")[1].split("?")[0];

    return `https://player.vimeo.com/video/${vimeoId}`;
  } else if (url.includes("dailymotion.com")) {
    const videoID = url.split("video/")[1].split("?")[0];

    return `https://www.dailymotion.com/embed/video/${videoID}`;
  } else if (url.includes("twitch.tv")) {
    if (url.includes("videos")) {
      const videoID = url.split("videos/")[1].split("?")[0];

      return `https://player.twitch.tv/?video=${videoID}&parent=example.com`;
    } else {
      const channelName = url.split("twitch.tv/")[1].split("?")[0];

      return `https://player.twitch.tv/?channel=${channelName}&parent=example.com`;
    }
  } else if (url.includes("facebook.com")) {
    const videoID = url.split("videos/")[1].split("?")[0];
    return `https://www.facebook.com/video/embed?video_id=${videoID}`;
  } else if (url.includes("instagram.com")) {
    return `${url}embed/`;
  } else if (url.includes("tiktok.com")) {
    return `${url}?embed=1`;
  }

  // Default: return the original URL if no supported provider is matched
  return url;
};
