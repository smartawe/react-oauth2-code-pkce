import React from 'react';
import { IAuthContext, IAuthProvider } from './types';
export declare const AuthContext: React.Context<IAuthContext>;
export declare const AuthProvider: ({ authConfig, children }: IAuthProvider) => React.JSX.Element;
