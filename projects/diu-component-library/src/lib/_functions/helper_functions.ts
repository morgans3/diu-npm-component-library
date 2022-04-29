import { style, state, animate, trigger, transition } from "@angular/animations";

export const generateID = function () {
    return new Date().toISOString().split("-").join().split(":").join().split(".").join().replace("T", "").replace("Z", "");
};

export const collapseAnimations = [
    trigger("expandCollapse", [
        state(
            "open",
            style({
                height: "*",
            })
        ),
        state(
            "close",
            style({
                height: "0px",
                "min-height": "0px",
                padding: "0px",
            })
        ),
        transition("open <=> close", animate(500)),
    ]),
];
