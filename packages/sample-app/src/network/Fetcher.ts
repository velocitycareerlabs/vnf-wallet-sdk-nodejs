/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface FetcherConfig<T> extends AxiosRequestConfig {
    data?: T;
}

async function fetcher<T, R>(config: FetcherConfig<T>): Promise<R> {
    const axiosConfig: AxiosRequestConfig = {
        ...config,
    };

    try {
        const response: AxiosResponse<R> = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error);
            throw error;
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
        }
    }
}

export default fetcher;
