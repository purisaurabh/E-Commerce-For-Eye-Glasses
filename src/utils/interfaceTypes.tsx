export interface PRODUCTINTERFACE {
    id: number,
    product_name: string,
    product_description: string,
    cost_price: number,
    selling_price: number,
    brand: string,
}


export interface CATEGORYINTERFACE {
    id: number,
    category_name: string,
}

export interface CATEGORYFORPRODUCT {
    id: number,
    product_name: string,
    product_description: string,
    cost_price: number,
    selling_price: number,
    brand: string,
    category_id: number
}


export interface CARTINTERFACE {
    color: string,
    price: number,
    product_id: number,
    product_name: string,
    quantity: number,
    size: string,
    size_id: number,
    total_price: number
}


export interface LOGIN {
    id: number,
    role: string,
    token: string
}


export interface USER {
    id: number,
    first_name: string,
    email: string,
    mobile_no: string,
    address: string,
    city: string,
    postal_code: number,
}


export interface PRODUCTFORMINTERFACE {
    product_name: string,
    product_description: string,
    cost_price: number,
    selling_price: number,
    brand: string,
    category_id: number
}


export interface PRODUCTSIZE {
    id: string,
    size: string,
    quantity: number
}

export interface COLOR {
    color: string,
}

export interface User {
    first_name: string;
    email: string;
    mobile_no: string;
    address: string;
    city: string;
    postal_code: number;
}

export interface ProductResponse {
    product_id: number,
    message: string
}

export interface IColorResponse {
    id: number
    message: string
}



export interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
