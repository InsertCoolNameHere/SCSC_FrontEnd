import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function InfoCard({ago, data_info, uploader_name, user_score}) {
  return (
    <Card sx={{ borderBottom: 1, borderRadius: '16px', borderColor: '#B7B1B0'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Uploaded: {ago} Days Ago
        </Typography>
        <Typography variant="h5" component="div">
          {data_info}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {uploader_name}
        </Typography>
        <Typography variant="body2">
          Rating: <b>{user_score}</b>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
}

export default InfoCard;