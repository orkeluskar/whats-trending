import { IconButton, Typography } from "@mui/joy";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Heading() {
    return (
        <Typography level="h3" sx={{ marginTop: '1rem' }}>What&apos;s Trending in US
            <Tooltip title="Support for other geo(s) coming soon" enterTouchDelay={0} sx={{ marginBottom: '1rem' }}>
                <IconButton size='sm'>
                    <InfoOutlinedIcon />
                </IconButton>
            </Tooltip>
        </Typography>
    );
}
