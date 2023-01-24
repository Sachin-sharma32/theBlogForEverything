import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useSelector } from "react-redux";

const actions = [
    {
        icon: <InstagramIcon className=" text-black" />,
        name: "Instagram",
        url: "https://instagram.com/the.blogforeverything?igshid=YmMyMTA2M2Y=",
    },
    {
        icon: <FacebookIcon />,
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=100089863353239&mibextid=LQQJ4d",
    },
    {
        icon: <TwitterIcon />,
        name: "Twitter",
        url: "https://twitter.com/parallelquotes/status/1059298596196114433?s=12&t=Qx1DqWgqxc1LNBztel4doA",
    },
    {
        icon: <TelegramIcon />,
        name: "Telegram",
        url: "https://t.me/+PFpcobYVHjU4NjZl",
    },
];

export default function Social() {
    const mode = useSelector((state) => state.base.mode);
    return (
        <div
            style={{ position: "sticky", bottom: 2, right: 20}}
            className={`${
                mode === "light" ? "" : ""
            } flex h-10 bg-transparent w-10`}
        >
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{
                    margin: 2,
                    "& .MuiFab-primary": {
                        backgroundColor: `${
                            mode === "dark" ? "white" : "black"
                        }`,
                        color: `${mode === "dark" ? "black" : "white"}`,
                        width: "39px",
                    },
                }}
                className=""
                icon={<SpeedDialIcon />}
                FabProps={{
                    sx: {
                        "&:hover": {
                            bgcolor: `${mode === "dark" ? "white" : "black"}`,
                            color: `${mode === "dark" ? "black" : "white"}`,
                        },
                    },
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        href={action.url}
                        sx={{
                            width: 50,
                            height: 50,
                            backgroundColor: "white",
                        }}
                        FabProps={{
                            sx: {
                                "&:hover": {
                                    bgcolor: "white",
                                    color: "black",
                                },
                            },
                        }}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}
