// Name: Control Controls
// ID: nkcontrols
// Description: Show and hide the project's controls.
// By: NamelessCat <https://scratch.mit.edu/users/NexusKitten/>
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Control Controls must run unsandboxed");
  }

  var fullScreen;
  var greenFlag;
  var pauseButton;
  var stopButton;

  const getButtons = () => {
    fullScreen = undefined;
    greenFlag = undefined;
    pauseButton = undefined;
    stopButton = undefined;

    const rightButtons = document.querySelectorAll(
      '[class*="stage-header_stage-button_"]'
    );
    fullScreen = rightButtons[rightButtons.length - 1];
    if (!fullScreen) {
      fullScreen =
        document.querySelector(".fullscreen-button") ||
        document.querySelector(".standalone-fullscreen-button");
    }

    greenFlag =
      document.querySelector('[class*="green-flag_green-flag_"]') ||
      document.querySelector(".green-flag-button");
    pauseButton =
      document.querySelector(".pause-btn") ||
      document.querySelector(".pause-button");
    stopButton =
      document.querySelector('[class*="stop-all_stop-all_"]') ||
      document.querySelector(".stop-all-button");
  };

  const highlightAnimation = (outlineColor, backgroundColor) => [
    [
      { outline: "#0000 2px solid" },
      {
        outline: outlineColor + " 2px solid",
        backgroundColor: backgroundColor,
      },
      { outline: "#0000 2px solid" },
      { outline: outlineColor + " 2px solid" },
      { outline: "#0000 2px solid" },
      {
        outline: outlineColor + " 2px solid",
        backgroundColor: backgroundColor,
      },
      { outline: "#0000 2px solid" },
    ],
    { duration: 1700 },
  ];

  class controlcontrols {
    constructor() {
      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        getButtons();
        for (const button of [fullScreen, greenFlag, pauseButton, stopButton]) {
          if (button) {
            button.style.display = "block";
          }
        }
      });
    }
    getInfo() {
      return {
        id: "nkcontrols",
        name: Scratch.translate("Control Controls"),
        color1: "#ffab19",
        color2: "#ec9c13",
        color3: "#b87d17",
        blocks: [
          {
            opcode: "showOption",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show [OPTION]"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
            extensions: ["colours_control"],
          },
          {
            opcode: "hideOption",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide [OPTION]"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
            extensions: ["colours_control"],
          },
          "---",
          {
            opcode: "optionShown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[OPTION] shown?"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
            extensions: ["colours_control"],
          },
          "---",
          {
            opcode: "highlightOption",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("highlight [OPTION]"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
            extensions: ["colours_control"],
          },
          "---",
          {
            opcode: "optionExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[OPTION] exists?"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
            extensions: ["colours_control"],
          },
        ],
        menus: {
          OPTION: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("green flag"),
                value: "green flag",
              },
              {
                text: Scratch.translate("pause"),
                value: "pause",
              },
              {
                text: Scratch.translate("stop"),
                value: "stop",
              },
              {
                text: Scratch.translate("fullscreen"),
                value: "fullscreen",
              },
            ],
          },
        },
      };
    }

    showOption(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        greenFlag.style.display = "block";
      } else if (args.OPTION === "pause" && pauseButton) {
        pauseButton.style.display = "block";
      } else if (args.OPTION === "stop" && stopButton) {
        stopButton.style.display = "block";
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        fullScreen.style.display = "block";
      }
    }

    hideOption(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        greenFlag.style.display = "none";
      } else if (args.OPTION === "pause" && pauseButton) {
        pauseButton.style.display = "none";
      } else if (args.OPTION === "stop" && stopButton) {
        stopButton.style.display = "none";
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        fullScreen.style.display = "none";
      }
    }

    highlightOption(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        greenFlag.animate(...highlightAnimation("#45993d", "#45993d2e"));
      } else if (args.OPTION === "pause" && pauseButton) {
        pauseButton.animate(...highlightAnimation("#d89400", "#d894002e"));
      } else if (args.OPTION === "stop" && stopButton) {
        stopButton.animate(...highlightAnimation("#b84848", "#b848482e"));
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        fullScreen.animate(
          ...highlightAnimation(
            "#666",
            "var(--ui-tertiary, hsla(215, 50%, 90%, 1))"
          )
        );
      }
    }

    optionShown(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        return greenFlag.style.display !== "none";
      } else if (args.OPTION === "pause" && pauseButton) {
        return pauseButton.style.display !== "none";
      } else if (args.OPTION === "stop" && stopButton) {
        return stopButton.style.display !== "none";
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        return fullScreen.style.display !== "none";
      }
      return false;
    }

    optionExists(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        return true;
      } else if (args.OPTION === "pause" && pauseButton) {
        return true;
      } else if (args.OPTION === "stop" && stopButton) {
        return true;
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        return true;
      }
      return false;
    }
  }
  Scratch.extensions.register(new controlcontrols());
})(Scratch);
