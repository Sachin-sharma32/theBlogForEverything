import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const actions = [
    {
        icon: <InstagramIcon />,
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
    return (
        <Box
            sx={{
                height: 320,
                transform: "translateZ(0px)",
                flexGrow: 1,
                position: "absolute",
                bottom: "0px",
                left: "80px",
                zIndex: "10",
            }}
        >
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    "& .MuiFab-primary": {
                        backgroundColor: "#2563eb",
                        color: "white",
                    },
                }}
                icon={<SpeedDialIcon />}
                FabProps={{
                    sx: {
                        "&:hover": {
                            bgcolor: "#dbeafe",
                            color: "black",
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
                            backgroundColor: "lightblue",
                        }}
                        FabProps={{
                            sx: {
                                "&:hover": {
                                    bgcolor: "#64a2ee",
                                    color: "black",
                                },
                            },
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
