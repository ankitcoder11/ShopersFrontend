<div className='preview_button_wrap previewBtn_animate' onMouseLeave={() => { setPreview(false) }}>
    <div className='animated_link_style_wrap' onClick={() => { setPreview(true) }} >
        <p className='visible_link text-appText font-appFont'>
            Preview
        </p>
        <p className='animate_link  text-appText font-appFont'>
            Preview
        </p>
    </div>
    {preview && <div className='previewBorderShadow fixed top-[54px] right-[8%]' ><Preview /></div>}
    {/* onMouseLeave={()=>{setPreview(false)}} */}
</div>