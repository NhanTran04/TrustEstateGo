import React, { useState } from 'react';
import { useRecordContext } from 'react-admin';
import { Box, IconButton, Typography, Dialog } from '@mui/material';
import { Image as ImageIcon, ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';
import { Property } from '../types';

const PropertyImages: React.FC = () => {
  const record = useRecordContext<Property>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (!record) return null;

  if (!record.images || record.images.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'text.secondary',
          p: 2,
          border: '1px dashed',
          borderRadius: 1,
        }}
      >
        <ImageIcon />
        <Typography variant="body2">Không có hình ảnh</Typography>
      </Box>
    );
  }

  const handlePrev = () => {
    setCurrentIndex(prev => prev === 0 ? record.images.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev === record.images.length - 1 ? 0 : prev + 1);
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: 150,
          height: 100,
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(true)} // mở dialog khi click vào ảnh
      >
        <img
          src={record.images[currentIndex]}
          alt={`Property ${currentIndex + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {record.images.length > 1 && (
          <>
            <IconButton
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.7)',
                '&:hover': { bgcolor: 'white' },
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>

            <IconButton
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.7)',
                '&:hover': { bgcolor: 'white' },
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>

      {/* Dialog để phóng to ảnh */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            width: '70vw',
          }}
        >
          <img
            src={record.images[currentIndex]}
            alt={`Property ${currentIndex + 1}`}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />

          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
          >
            <Close />
          </IconButton>

          {record.images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{ position: 'absolute', left: 8, color: 'white' }}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{ position: 'absolute', right: 8, color: 'white' }}
              >
                <ArrowForwardIos />
              </IconButton>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default PropertyImages;
