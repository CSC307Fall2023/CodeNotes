import Note from '../pages.js';
import { render, act, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { enableFetchMocks } from 'jest-fetch-mock'
import { checkCustomRoutes } from 'next/dist/lib/load-custom-routes';

