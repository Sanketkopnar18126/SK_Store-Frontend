import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Store";
import {
  removeUploadedUrl,
  uploadImages,
} from "../../../Store/Slices/ProductSlice";
import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemGrid from "./ItemGrid";

type Props = {
  initialUrls?: string[];
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
};

const ImageUploader: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const uploadedUrls = useSelector(
    (state: RootState) => state.products.uploadedUrls
  );
  const uploading = useSelector((state: RootState) => state.products.uploading);

  const handleSelect = (fileList: FileList | null) => {
    if (!fileList) return;
    const filesArray = Array.from(fileList);
    dispatch(uploadImages(filesArray));
  };

  const handleRemove = (url: string) => {
    dispatch(removeUploadedUrl(url));
  };

  return (
    <Box>
      <Button
        variant="outlined"
        component="label"
        disabled={uploading}
        sx={{ mb: 2 }}
      >
        Upload Images
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleSelect(e.target.files)}
        />
      </Button>

      {uploading && (
        <Box display="flex" alignItems="center" mb={2}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          Uploading...
        </Box>
      )}

      <Grid container spacing={2}>
        {uploadedUrls.map((src) => (
          <ItemGrid item xs={4} key={src}>
            <Card sx={{ position: "relative", height: 120 }}>
              <CardMedia
                component="img"
                image={src}
                alt="preview"
                sx={{ height: "100%", objectFit: "cover" }}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemove(src)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "white",
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Card>
          </ItemGrid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageUploader;
