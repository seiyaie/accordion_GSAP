const accordion = () => {
    const details = document.querySelectorAll(".js-details");

    if (!details.length) return;

    details.forEach((detail) => {
        const summary = detail.querySelector(".js-summary");
        const content = detail.querySelector(".js-content");

        if (!summary || !content) return;

        summary.addEventListener("click", (e) => {
            e.preventDefault();

            //アニメーション中の場合は処理を中断
            if (detail.dataset.isAnimation === "true") {
                return;
            }

            if (detail.open) {
                detail.dataset.isAnimation = "true";
                //closeアニメーション
                gsap.fromTo(
                    content,
                    {
                        height: content.scrollHeight + "px",
                        opacity: 1,
                    },
                    {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: "linear",
                        onComplete: () => {
                            detail.removeAttribute("open");
                            delete detail.dataset.isAnimation;
                        },
                    }
                );
            } else {
                detail.setAttribute("open", "true");
                requestAnimationFrame(() => {
                    const height = content.scrollHeight;
                    detail.dataset.isAnimation = "true";
                    gsap.fromTo(
                        content,
                        {
                            height: 0,
                            opacity: 0,
                        },
                        {
                            height: height + "px",
                            opacity: 1,
                            duration: 0.3,
                            ease: "linear",
                            onComplete: () => {
                                delete detail.dataset.isAnimation;
                            },
                        }
                    );
                });
            }
        });
    });
};

accordion();
