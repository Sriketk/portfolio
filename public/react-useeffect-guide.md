# React useEffect Hook Guide

## What is useEffect?

`useEffect` is a React Hook that lets you synchronize a component with an external system (APIs, DOM, timers, subscriptions, etc.). It runs after the component renders.

```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Your effect code here
}, [dependencies]);
```

---

## Basic Syntax

```jsx
useEffect(setup, dependencies?)
```

- **setup**: A function containing your effect logic. Can optionally return a cleanup function.
- **dependencies**: Optional array of reactive values (props, state, variables) that the effect depends on.

---

## Common Patterns

### 1. Run on Every Render (No Dependency Array)

```jsx
useEffect(() => {
  console.log('This runs after every render');
});
```

⚠️ Use sparingly - can cause performance issues.

### 2. Run Only Once on Mount (Empty Dependency Array)

```jsx
useEffect(() => {
  console.log('This runs only once when component mounts');
}, []);
```

Great for: Initial data fetching, setting up subscriptions, one-time initialization.

### 3. Run When Dependencies Change

```jsx
useEffect(() => {
  console.log(`Count changed to: ${count}`);
}, [count]);
```

Runs on mount AND whenever `count` changes.

---

## Cleanup Function

Return a function from useEffect to clean up side effects:

```jsx
useEffect(() => {
  const subscription = api.subscribe(userId);
  
  // Cleanup function - runs before next effect and on unmount
  return () => {
    subscription.unsubscribe();
  };
}, [userId]);
```

### When Cleanup Runs:
1. Before the effect runs again (when dependencies change)
2. When the component unmounts

---

## Practical Examples

### Fetching Data

```jsx
useEffect(() => {
  let isCancelled = false;

  async function fetchData() {
    const response = await fetch(`/api/user/${userId}`);
    const data = await response.json();
    
    if (!isCancelled) {
      setUser(data);
    }
  }

  fetchData();

  return () => {
    isCancelled = true;
  };
}, [userId]);
```

### Event Listeners

```jsx
useEffect(() => {
  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### Timers

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);

  return () => clearInterval(intervalId);
}, []);
```

### Document Title

```jsx
useEffect(() => {
  document.title = `You have ${count} notifications`;
}, [count]);
```

### Local Storage Sync

```jsx
useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

---

## Common Mistakes

### 1. Missing Dependencies

```jsx
// ❌ Bad - count is used but not in dependencies
useEffect(() => {
  console.log(count);
}, []);

// ✅ Good
useEffect(() => {
  console.log(count);
}, [count]);
```

### 2. Object/Array Dependencies

```jsx
// ❌ Bad - creates new object every render, infinite loop!
useEffect(() => {
  fetchData(options);
}, [{ page: 1 }]);

// ✅ Good - use primitive values or useMemo
useEffect(() => {
  fetchData({ page });
}, [page]);
```

### 3. Forgetting Cleanup

```jsx
// ❌ Bad - memory leak, listener never removed
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
}, []);

// ✅ Good
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 4. Async Directly in useEffect

```jsx
// ❌ Bad - useEffect can't be async directly
useEffect(async () => {
  const data = await fetchData();
}, []);

// ✅ Good - define async function inside
useEffect(() => {
  async function getData() {
    const data = await fetchData();
    setData(data);
  }
  getData();
}, []);
```

---

## useEffect vs Other Hooks

| Hook | Purpose |
|------|---------|
| `useEffect` | Side effects after render (data fetching, subscriptions, DOM changes) |
| `useLayoutEffect` | Side effects before browser paint (DOM measurements) |
| `useMemo` | Memoize expensive calculations |
| `useCallback` | Memoize functions |

---

## Quick Reference

```jsx
// Run once on mount
useEffect(() => { ... }, []);

// Run when dep changes
useEffect(() => { ... }, [dep]);

// Run every render
useEffect(() => { ... });

// With cleanup
useEffect(() => {
  // setup
  return () => { /* cleanup */ };
}, [dep]);
```

---

## Rules of Hooks

1. Only call useEffect at the top level (not in loops, conditions, or nested functions)
2. Only call useEffect from React function components or custom hooks

---

*Last updated: January 2026*
