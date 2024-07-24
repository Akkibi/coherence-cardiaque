const animCoherence = (
  totalTime: number,
  startTime: number,
  endTime: number,
  tlFace: gsap.core.Timeline,
  tlLinear: gsap.core.Timeline
) => {
  let cumulatedTime = 0;

  for (let i = 0; i < totalTime / (startTime + endTime); i++) {
    const animationDuration =
      startTime + ((endTime - startTime) * cumulatedTime) / totalTime;
    tlFace
      .fromTo(
        "#linear-eyes",
        { y: "0%", x: "-50%" },
        {
          y: "-400%",
          x: "-50%",
          duration: animationDuration,
          ease: "power2.inOut",
        },
        cumulatedTime
      )
      .to(
        "#linear-eyes",
        {
          y: "0%",
          x: "-50%",
          duration: animationDuration,
          ease: "power2.inOut",
        },
        ">"
      )
      .fromTo(
        "#linear-mouth",
        { y: "0%", x: "-50%", width: "5%", height: "5%" },
        {
          y: "-200%",
          x: "-50%",
          duration: animationDuration,
          ease: "power2.inOut",
          width: "15%",
          height: "10%",
        },
        cumulatedTime
      )
      .to(
        "#linear-mouth",
        {
          y: "0%",
          x: "-50%",
          duration: animationDuration,
          ease: "power2.inOut",
          width: "5%",
          height: "5%",
        },
        ">"
      );
    if (window.innerWidth > 768) {
      tlLinear
        .fromTo(
          "#linear-handle",
          { top: "100%", y: "-100%" },
          { top: "0%", y: "0%", duration: animationDuration, ease: "linear" },
          cumulatedTime
        )
        .to(
          "#linear-handle",
          {
            top: "100%",
            y: "-100%",
            duration: animationDuration,
            ease: "linear",
          },
          ">"
        );
    } else {
      tlLinear
        .fromTo(
          "#linear-handle",
          { left: "100%", x: "-100%" },
          {
            left: "0%",
            x: "0%",
            duration: animationDuration,
            ease: "linear",
          },
          cumulatedTime
        )
        .to(
          "#linear-handle",
          {
            left: "100%",
            x: "-100%",
            duration: animationDuration,
            ease: "linear",
          },
          ">"
        );
    }
    cumulatedTime += animationDuration * 2;
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

export default animCoherence;
