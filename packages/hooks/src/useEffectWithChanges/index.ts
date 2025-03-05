import { useRef, useEffect, type EffectCallback, type DependencyList } from 'react';

function useEffectWithChanges(
  effect: (triggeredDeps: boolean[]) => ReturnType<EffectCallback>,
  deps: DependencyList,
): void {
  const previousDeps = useRef<DependencyList>(deps);

  useEffect(() => {
    const triggeredDeps = deps.map((dep, index) => !Object.is(dep, previousDeps.current[index]));

    effect(triggeredDeps);
    previousDeps.current = [...deps];
  }, [effect, deps]);
}

export default useEffectWithChanges;
