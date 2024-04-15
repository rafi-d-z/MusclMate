// This is where the dashboard tests will go
import  { test,describe } from "node:test";
import MainMenu from "../src/App";
import {render, screen} from '@testing-library/react'
import React from "react";

describe("dashboard tests", () => {
    test('renders dashboard', () => {
        render(React.createElement(typeof MainMenu, null));
        const menuElem = screen.getByRole("menu");
        expect(menuElem).toBeTruthy();
    })
})
