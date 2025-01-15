import React, { useState, useCallback } from "react";

const QuantitySelector = ({ initialQuantity = 1, onChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    // Handle increment action
    const handleIncrement = useCallback(() => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onChange(newQuantity);
    }, [quantity, onChange]);

    // Handle decrement action
    const handleDecrement = useCallback(() => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onChange(newQuantity);
        }
    }, [quantity, onChange]);

    // Handle manual input change
    const handleInputChange = useCallback((e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
            onChange(value);
        }
    }, [onChange]);

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleDecrement}>-</button>
            <input
                className="w-[30px] outline-none"
                value={quantity}
                onChange={handleInputChange}
                type="number"
                min="1"
            />
            <button style={styles.button} onClick={handleIncrement}>+</button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "4px",
        maxWidth: "120px",
        justifyContent: "space-between",
        padding: "3px",
    },
    button: {
        border: "none",
        backgroundColor: "transparent",
        fontSize: "20px",
        cursor: "pointer",
        outline: "none",
        paddingLeft: "10px",
        paddingRight: "10px",
    },
};

export default QuantitySelector;