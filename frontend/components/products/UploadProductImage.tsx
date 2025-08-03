"use client"

import { uploadImage } from "@/actions/upload-image-action"
import { getImagePath } from "@/src/utils"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export default function UploadProductImage({
  currentImage,
}: {
  currentImage?: string
}) {
  const [image, setImage] = useState("")

  const onDrop = useCallback(async (files: File[]) => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append("file", file)
    })
    const image = await uploadImage(formData)
    setImage(image)
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpg"],
        "image/png": [".png"],
      },
      onDrop,
      maxFiles: 1,
    })

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-serif font-bold text-primary-dark mb-3">
          Imagen del Producto
        </label>
        <div
          {...getRootProps({
            className: `
              flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-center transition-colors
              ${
                isDragActive
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-secondary text-secondary-text"
              } 
              ${isDragReject ? "border-red-500 bg-red-50 text-red-500" : ""}
              cursor-pointer hover:border-accent
            `,
          })}
        >
          <input {...getInputProps()} />
          <div className="mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          {isDragActive ? (
            <p className="font-medium">Suelta la imagen aquí...</p>
          ) : isDragReject ? (
            <p className="font-medium">Archivo no válido. Solo JPG/PNG</p>
          ) : (
            <>
              <p className="font-medium">Arrastra y suelta una imagen aquí</p>
              <p className="text-sm mt-1">o haz clic para seleccionar</p>
              <p className="text-xs mt-2 text-gray-500">
                Formatos: JPG, PNG (max 5MB)
              </p>
            </>
          )}
        </div>
      </div>

      {(image || currentImage) && (
        <div className="space-y-3">
          <p className="font-serif font-bold text-primary-dark">
            Previsualización:
          </p>
          <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-secondary">
            <Image
              src={image ? image : getImagePath(currentImage!)}
              alt="Imagen del producto"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <input
        type="hidden"
        name="image"
        defaultValue={image ? image : currentImage}
      />
    </div>
  )
}
