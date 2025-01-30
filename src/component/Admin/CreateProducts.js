import React, { useState } from 'react'
import { ImageInputComponent, NumberInputComponent, SelectInputComponent, TextAreaInputComponent, TextInputComponent } from '../../utiles/InputFields'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CiCircleRemove } from 'react-icons/ci';
import LoginButtonComponent from '../LoginInputs/LoginButtonComponent';
import toast from 'react-hot-toast';
import { createProduct } from '../../api/products';

const formikSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required.'),
    category: Yup.string().required('Product category is required.'),
    subcategory: Yup.string().required('Product sub-category is required.'),
    price: Yup.string().required('Product price is required.'),
    stock: Yup.string().required('Product stock is required.'),
    imageUrl: Yup.array().min(1, 'At least one image is required.').required('Product images are required.'),
});

const CreateProducts = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [loader, setLoader] = useState(false);

    const callApi = async (values) => {
        setLoader(true);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('category', values.subcategory);
        formData.append('mainCategory', values.category);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        selectedImages.forEach((image) => {
            formData.append('imageUrl', image);
        });
        try {
            const response = await createProduct(formikForm?.values?.category, formData);
            toast.success(response?.message);
            formikForm?.resetForm();
            setSelectedImages('');
            formikForm.setFieldValue('imageUrl', '');
        } catch (error) {
            console.error(error)
        } finally {
            setLoader(false);
        }
    }

    const category = [
        { name: 'Men', value: 'mens' },
        { name: 'Women', value: 'womens' },
        { name: 'Electronic', value: 'electronics' }
    ]

    const subcategory = {
        mens: [
            { name: 'Watches', value: 'watches' },
            { name: 'Shirts', value: 'shirts' },
            { name: 'T- Shirts', value: 't-shirts' },
            { name: 'Shoes', value: 'shoes' },
        ],
        womens:
            [
                { name: 'Bags', value: 'bags' },
                { name: 'Tops', value: 'tops' },
                { name: 'T- Shirts', value: 't-shirts' },
                { name: 'Shoes', value: 'shoes' },
            ],
        electronics:
            [
                { name: 'Smart Watches', value: 'smart-watches' },
                { name: 'Laptops', value: 'laptops' },
                { name: 'Mobiles', value: 'mobiles' },
            ],
    }

    const formikForm = useFormik({
        initialValues: {
            name: '',
            description: '',
            category: '',
            subcategory: '',
            price: '',
            stock: '',
            imageUrl: [],
        },
        validationSchema: formikSchema,
        onSubmit: (values) => callApi(values),
    })

    const handleRemoveImage = (index) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        formikForm.setFieldValue('imageUrl', '')
        setSelectedImages(newImages);
    };

    return (
        <form className='w-full flex flex-col items-center justify-center font-bodyFont py-[10px] gap-[10px]'>
            <div className='text-[30px] font-semibold'>Create Product</div>
            <div className='w-[90%] flex gap-[10px]'>
                <div className='w-[65%] flex flex-col gap-[15px]'>
                    <TextInputComponent label={'Product Name'} placeholder={'Product Name'} name={'name'} value={formikForm?.values?.name} changeHandler={formikForm.handleChange} errors={formikForm?.errors?.name} touched={formikForm?.touched?.name} />
                    <TextAreaInputComponent label={'Product Description'} placeholder={'Product Description'} name={'description'} value={formikForm?.values?.description} changeHandler={formikForm.handleChange} errors={formikForm?.errors?.description} touched={formikForm?.touched?.description} />
                    <SelectInputComponent label={'Product Category'} name={'category'} options={category} value={formikForm?.values?.category} changeHandler={formikForm.handleChange} errors={formikForm?.errors?.category} touched={formikForm?.touched?.category} />
                    <div className='w-full relative'>
                        <SelectInputComponent label={'Product Sub-Category'} name={'subcategory'} options={subcategory[formikForm?.values?.category] || []} value={formikForm?.values?.subcategory} changeHandler={formikForm.handleChange} errors={formikForm?.errors?.subcategory} touched={formikForm?.touched?.subcategory} />
                        {!formikForm?.values?.category && <div className='w-full h-full absolute bg-black top-0 opacity-10'></div>}
                    </div>
                    <NumberInputComponent label={'Product Stock'} placeholder={'45'} name={'stock'} value={formikForm?.values?.stock} changeHandler={formikForm.handleChange} errors={formikForm?.errors?.stock} touched={formikForm?.touched?.stock} />
                    <NumberInputComponent label={'Product Price'} placeholder={'899'} name={'price'} value={formikForm?.values?.price} changeHandler={formikForm.handleChange} errors={formikForm?.errors?.price} touched={formikForm?.touched?.price} />
                </div>
                <div className='w-[35%]'>
                    <ImageInputComponent label={'Product Images'} setSelectedImages={(files) => { setSelectedImages(files); formikForm.setFieldValue('imageUrl', files) }} errors={formikForm?.errors?.imageUrl} touched={formikForm?.touched?.imageUrl} />
                    {selectedImages && <div className="flex flex-wrap gap-[5px] pt-[10px] justify-center">
                        {selectedImages?.map((image, index) => (
                            <div key={index} className="relative w-[160px] h-[135px]">
                                <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 text-red-500 text-[30px]">
                                    <CiCircleRemove />
                                </button>
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
            <LoginButtonComponent buttonText={'Create Product'} bg={'black'} loader={loader} handler={formikForm.handleSubmit} />
        </form>
    )
}

export default CreateProducts