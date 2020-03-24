import React from "react"
import { Scroller, StepContainer } from "./scroller"
import { useSpring } from "use-spring"

export function CodeHike({ steps, views }) {
  const height = 200
  const [currentIndex, setCurrentIndex] = React.useState(null)
  const [progress] = useSpring(currentIndex)
  return (
    <div
      style={{
        width: 1010,
        marginLeft: -590,
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 420,
          marginLeft: 0,
          position: "static",
          top: "auto",
          zIndex: "auto",
          height: "auto",
          paddingRight: 85,
          color: "white",
          background: "black",
        }}
      >
        <div
          style={{
            height,
            width: "100%",
            position: "sticky",
            top: `calc(50vh - ${height / 2}px)`,
            background: "gray",
          }}
        >
          {progress}
        </div>
      </div>
      <Scroller onStepChange={index => setCurrentIndex(index)}>
        <div
          style={{
            paddingTop: 0,
            width: 420,
            paddingLeft: 85,
          }}
        >
          {steps.map((child, i) => (
            <StepContainer
              style={{
                position: "relative",
                marginBottom: 50,
              }}
              id={i}
              key={i}
            >
              {child}
              <div
                id={"step-" + i}
                style={{
                  position: "absolute",
                  height: "100vh",
                  top: "calc(50% - max(50vh, 50%))",
                  visibility: "hidden",
                }}
              />
              <StepLink index={i} progress={progress} />
            </StepContainer>
          ))}
        </div>
      </Scroller>
    </div>
  )
}

function StepLink({ index, progress }) {
  return (
    <a
      style={{
        position: "absolute",
        height: "100%",
        width: 30,
        left: -45,
        top: 0,
        opacity: Math.max(1 - Math.abs(index - progress), 0.2),
        display: "block",
        background: "rgba(175,173,169,0.5)",
        textAlign: "center",
        color: "rgba(175,173,169,1)",
        paddingTop: 10,
        boxSizing: "border-box",
        border: "2px solid rgba(175,173,169,1)",
        // borderRight: 0,
        // borderTopLeftRadius: 16,
        // borderBottomLeftRadius: 16,
      }}
      href={"#step-" + index}
    >
      <svg
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
      </svg>
    </a>
  )
}
