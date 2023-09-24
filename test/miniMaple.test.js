import {MiniMaple} from "../src/miniMaple";

test('it should block a non string type', () => {
    expect(new MiniMaple("x", "x")._check_variable(123)).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_polynom(123)).toBe(undefined);
});

test('it should block a non string type in constructor', () => {
    try {
        new MiniMaple([], {})
    } catch (error) {
        expect(error.message).toBe('invalid arguments');
        return        
    }
    expect(true).toBeFalsy();
});


test('it should block an empty string', () => {
    expect(new MiniMaple("x", "x")._check_variable("")).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_polynom("")).toBe(undefined);
});

test('it should block an empty strings in constructor', () => {
    try {
        new MiniMaple("", "")
    } catch (error) {
        expect(error.message).toBe('invalid arguments');
        return        
    }
    expect(true).toBeFalsy();
});

test('it should block an empty string in constructor', () => {
    try {
        new MiniMaple("")
    } catch (error) {
        expect(error.message).toBe('invalid arguments');
        return        
    }
    expect(true).toBeFalsy();
});

test('it should get a variable correctly', () => {
    expect(new MiniMaple("x", "x")._check_variable('x')).toBeTruthy();
    expect(new MiniMaple("x", "x")._check_variable('y')).toBeTruthy();
    expect(new MiniMaple("x", "x")._check_variable('Z')).toBeTruthy();
    expect(new MiniMaple("x", "x")._check_variable('a')).toBeTruthy();
});

test('it should block a wrong variable', () => {
    expect(new MiniMaple("x", "x")._check_variable('xx')).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_variable('+')).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_variable('-z')).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_variable('x^2')).toBe(undefined);
});

test('it should parse polynoms correctly', () => {
    expect(new MiniMaple("x", "x")._check_polynom('x')).toBeTruthy();
    expect(new MiniMaple("x", "x")._check_polynom('x^2')).toBeTruthy();
    expect(new MiniMaple("x", "x")._check_polynom('4*Z')).toBeTruthy();
    expect(new MiniMaple("x", "x")._check_polynom('-2')).toBeTruthy();
    expect(new MiniMaple("x", "x")._check_polynom('2')).toBeTruthy();
    expect(new MiniMaple("x", "x")._check_polynom('-2*x^123')).toBeTruthy();
    expect(new MiniMaple("x", "x")._check_polynom('-4*-a^2+g^4-g+5*y^1')).toBeTruthy();
});

test('it should drop out wrong polynoms', () => {
    expect(new MiniMaple("x", "x")._check_polynom('x*x')).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_polynom('4x')).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_polynom('x4')).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_polynom('--z')).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_polynom('&lkegw')).toBe(undefined);    
    expect(new MiniMaple("x", "x")._check_polynom('xx')).toBe(undefined);    
    expect(new MiniMaple("x", "x")._check_polynom('y^^2')).toBe(undefined);
    expect(new MiniMaple("x", "x")._check_polynom('3/2')).toBe(undefined);
});


test('The constructor should not throw undefined if both arguments were right', () => {
    expect(new MiniMaple("x", "x") !== undefined).toBeTruthy();
    expect(new MiniMaple("y", "x") !== undefined).toBeTruthy();
    expect(new MiniMaple("x^2", "y") !== undefined).toBeTruthy();
    expect(new MiniMaple("-4*x+y^123", "x") !== undefined).toBeTruthy();
    
});

test('it should construct without a giving variable', () => {
    expect(new MiniMaple("-x^3") !== undefined).toBeTruthy();
});

test('The constructor should throw undefined if at least one argument was wrong', () => {
    expect(new MiniMaple("x", "x") !== undefined).toBeTruthy();
    expect(new MiniMaple("y", "x") !== undefined).toBeTruthy();
    expect(new MiniMaple("x^2", "y") !== undefined).toBeTruthy();
    expect(new MiniMaple("-4*x+y^123", "x") !== undefined).toBeTruthy();
    
});

test('it should difference polynoms without minuses', () => {
    expect(new MiniMaple("x", "x").diff()).toBe("1");
    expect(new MiniMaple("2*x", "x").diff()).toBe("2");
    expect(new MiniMaple("x^29", "x").diff()).toBe("29*x^28");
    expect(new MiniMaple("x+y", "x").diff()).toBe("1");
    expect(new MiniMaple("6*x^3+x^5", "x").diff()).toBe("18*x^2+5*x^4");
    expect(new MiniMaple("4*x^3+x^2+x+3", "x").diff()).toBe("12*x^2+2*x+1");    
});

test('it should difference polynoms with minuses at coefs', () => {
    expect(new MiniMaple("-2*x", "x").diff()).toBe("-2");
    expect(new MiniMaple("-2*x-3+y", "x").diff()).toBe("-2");
    expect(new MiniMaple("-1*x^3+y", "x").diff()).toBe("-3*x^2");
    expect(new MiniMaple("-6*x^3+x^5", "x").diff()).toBe("-18*x^2+5*x^4");
    expect(new MiniMaple("-4*x^3+x^2+x-3", "x").diff()).toBe("-12*x^2+2*x+1");
});

test('it should difference polynoms with minuses', () => {
    expect(new MiniMaple("-2*-x", "x").diff()).toBe("2");
    expect(new MiniMaple("2*-x", "x").diff()).toBe("-2");
    expect(new MiniMaple("2*-x-3+y", "x").diff()).toBe("-2");
    expect(new MiniMaple("-1*x^3+y", "x").diff()).toBe("-3*x^2");
    expect(new MiniMaple("-6*x^3-x^5", "x").diff()).toBe("-18*x^2-5*x^4");
    expect(new MiniMaple("-4*x^3-x^2+x-3", "x").diff()).toBe("-12*x^2-2*x+1");    
});

// it should cover 100%

test('it should give same results every launch', () => {
    const mm = new MiniMaple("-2*-x", "x")
    expect(mm.diff()).toBe(mm.diff());  
});

test('it should skip parts like 0*x', () => {
    expect(new MiniMaple("0*-x", "x").diff()).toBe("0");
});

test('it should skip parts like x^0', () => {
    expect(new MiniMaple("-x^0", "x").diff()).toBe("0");
});

test('it should give 0 in some ways', () => {
    expect(new MiniMaple("0*-x-x^0", "x").diff()).toBe("0");
});