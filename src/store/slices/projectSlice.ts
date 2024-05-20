import { Project } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Project | null = null;

export const projectSlice = createSlice<
  Project | null,
  Record<string, never>,
  'project',
  Record<string, never>,
  'project'
>({
  name: 'project',
  initialState,
  reducers: {},
});

export default projectSlice;
