/** @jsxImportSource @emotion/react */

import { CartItem, MenuItem } from "@/libs/types/item";
import { css } from "@emotion/react";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function MenuItemPaper({
    itemMenuInfo,
    itemCartInfo = { id: "", quantity: 0 },
    addToCart,
}: {
    itemMenuInfo: MenuItem;
    itemCartInfo?: CartItem;
    addToCart: () => void;
}) {
    return (
        <Button onClick={addToCart} sx={{ margin: 2, padding: 0 }}>
            <Badge
                badgeContent={itemCartInfo.quantity}
                color="primary"
                css={css`
                    & > .MuiBadge-badge {
                        width: 30px;
                        height: 30px;
                        border-radius: 15px;
                        font-size: 17px;
                        font-weight: 400;
                    }
                `}
            >
                <Card sx={{ width: 200 }}>
                    <CardMedia sx={{ height: 160 }} image={itemMenuInfo.image} />
                    <Stack sx={{ padding: "16px" }}>
                        <Typography gutterBottom variant="body2" fontWeight="500" align="left">
                            {itemMenuInfo.name}
                        </Typography>
                        <Stack direction="row" alignItems="baseline">
                            <Typography variant="body2" fontWeight="400">
                                売価:&nbsp;
                            </Typography>
                            <Typography variant="h6" fontWeight="500">
                                ¥{itemMenuInfo.price.toLocaleString()}
                            </Typography>
                        </Stack>
                    </Stack>
                </Card>
            </Badge>
        </Button>
    );
}
