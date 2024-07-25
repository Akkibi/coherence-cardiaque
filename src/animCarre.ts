const animCarre = (
  totalTime: number,
  startTime: number,
  endTime: number,
  tlFace: gsap.core.Timeline
) => {
  let cumulatedTime = 0;

  for (let i = 0; i < totalTime / (startTime * 2 + endTime * 2); i++) {
    const animationDuration =
      startTime + ((endTime - startTime) * cumulatedTime) / totalTime;
    tlFace
      .fromTo(
        ".square-eyes",
        { y: "0%", x: "-50%" },
        {
          y: "-75%",
          x: "-50%",
          duration: animationDuration,
          delay: animationDuration * 0.75,
          ease: "power2.inOut",
        },
        cumulatedTime
      )
      .to(
        ".square-eyes",
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
        { y: "100%", x: "-50%", width: "10%", height: "5%" },
        {
          y: "-250%",
          x: "-50%",
          duration: animationDuration,
          delay: animationDuration * 0.75,
          ease: "power2.inOut",
          width: "30%",
          height: "10%",
        },
        cumulatedTime
      )
      .to(
        "#square-mouth",
        {
          y: "-400%",
          x: "-50%",
          duration: animationDuration * 0.25,
          ease: "power2.inOut",
          width: "30%",
          height: "5%",
        },
        ">"
      )
      .to(
        "#square-mouth",
        {
          y: "0%",
          x: "-50%",
          duration: animationDuration,
          delay: animationDuration * 0.75,
          ease: "power2.inOut",
          width: "10%",
          height: "15%",
        },
        ">"
      )
      .to(
        "#square-mouth",
        {
          y: "100%",
          x: "-50%",
          duration: animationDuration * 0.25,
          ease: "power2.inOut",
          width: "10%",
          height: "5%",
        },
        ">"
      );
    tlFace
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
      "#bg-gradient-progress",
      { background: "conic-gradient(#046AD7 0deg,#00000000 0deg)" },
      {
        background: "conic-gradient( #046AD7 360deg,#00000000 360deg)",
        duration: cumulatedTime,
        ease: "linear",
      },
      0
    );
};

export default animCarre;
