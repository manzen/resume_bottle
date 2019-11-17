import * as React from 'react'
import styled from '@emotion/styled'

type Props = {
    onSetFile: (data: string) => void
}

const imageToBase64 = (img: HTMLImageElement, mimeType: 'image/jpeg' | 'image/png') => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(img, 0, 0)
    return canvas.toDataURL(mimeType)
}

const Uploader = (props: Props) => {
    const { onSetFile } = props
    const [file, setFile] = React.useState<File | undefined>(undefined)
    const imageRef = React.useRef<HTMLImageElement | null>(null)

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setFile(file)
    }, [])

    React.useLayoutEffect(() => {
        if (!file) return
        const $img = imageRef.current
        const reader = new FileReader()
        console.log(file)
        reader.onload = evt => {
            if (!(evt.target && $img)) return
            $img.onload = () => {
                const base64Data = imageToBase64($img, 'image/jpeg')
                if (!base64Data) return
                onSetFile(base64Data)
            }
            $img.src = evt.target.result as string
        }

        reader.readAsDataURL(file)
    }, [file])

    return (
        <Wrapper>
            {file ? (
                <PreviewImage ref={imageRef} />
            ) : (
                <EmptyBox>
                    <Label>
                        <input type="file" onChange={handleChange} />
                    </Label>
                    <CloudImage src="/img/cloud_upload.png" alt="" />
                </EmptyBox>
            )}
        </Wrapper>
    )
}

export default Uploader

const Wrapper = styled.div``

const EmptyBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border: 2px dashed #abd6f9;
    box-sizing: border-box;
`

const Label = styled.label`
    position: absolute;
    width: 100%;
    height: 100%;
    input {
        visibility: hidden;
    }
`

const CloudImage = styled.img`
    pointer-events: none;
`

const PreviewImage = styled.img`
    max-width: 100%;
`
