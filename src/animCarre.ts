const animCarre = (
  totalTime: number,
  startTime: number,
  endTime: number,
  tlFace: gsap.core.Timeline,
  tlSquare: gsap.core.Timeline
) => {
  let cumulatedTime = 0;

  for (let i = 0; i < totalTime / (startTime * 2 + endTime * 2); i++) {
    const animationDuration =
      startTime + ((endTime - startTime) * cumulatedTime) / totalTime;
    tlFace
      .fromTo(
        "#square-eyes",
        { y: "0%", x: "-50%" },
        {
          y: "-400%",
          x: "-50%",
          duration: animationDuration,
          delay: animationDuration,
          ease: "power2.inOut",
        },
        cumulatedTime
      )
      .to(
        "#square-eyes",
        {
          y: "0%",
          x: "-50%",
          duration: animationDuration,
          delay: animationDuration,
          ease: "power2.inOut",
        },
        ">"
      )
      .fromTo(
        "#square-mouth",
        { y: "0%", x: "-50%", width: "5%", height: "5%" },
        {
          y: "-200%",
          x: "-50%",
          duration: animationDuration,
          delay: animationDuration,
          ease: "power2.inOut",
          width: "15%",
          height: "10%",
        },
        cumulatedTime
      )
      .to(
        "#square-mouth",
        {
          y: "0%",
          x: "-50%",
          duration: animationDuration,
          delay: animationDuration,
          ease: "power2.inOut",
          width: "5%",
          height: "5%",
        },
        ">"
      );
    tlSquare
      .fromTo(
        "#square-handle",
        {
          top: "0%",
          left: "0%",
          x: "25%",
          y: "25%",
        },
        {
          top: "0%",
          left: "100%",
          x: "-125%",
          y: "25%",
          duration: animationDuration,
          ease: "linear",
        },
        cumulatedTime
      )
      .to(
        "#square-handle",
        {
          top: "100%",
          left: "100%",
          x: "-125%",
          y: "-125%",
          duration: animationDuration,
          ease: "linear",
        },
        ">"
      )
      .to("#square-handle", {
        top: "100%",
        left: "0%",
        x: "25%",
        y: "-125%",
        duration: animationDuration,
        ease: "linear",
      })
      .to("#square-handle", {
        top: "0%",
        left: "0%",
        x: "25%",
        y: "25%",
        duration: animationDuration,
        ease: "linear",
      });
    cumulatedTime += animationDuration * 4;
  }
  tlFace
    .fromTo(
      "#timer",
      { textContent: cumulatedTime },
      {
        textContent: 0,
        duration: cumulatedTime,
        ease: "linear",
        snap: { textContent: 1 },
      },
      0
    )
    .fromTo(
      "#bg-progress",
      { y: "100%" },
      { y: "0%", duration: cumulatedTime, ease: "linear" },
      0
    );
};

export default animCarre;
