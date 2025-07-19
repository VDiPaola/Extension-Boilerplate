//waits for selected element to load
export const waitForElement = (observeEl: Element, selector: string): Promise<Element | null> => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(_ => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(observeEl, {
            childList: true,
            subtree: true
        });
    });
}

//waits for selected element to load
export const waitForElements = (observeEl: Element, selector: string, amount: number): Promise<NodeListOf<Element>> => {
    return new Promise(resolve => {
        if (document.querySelectorAll(selector).length >= amount) {
            return resolve(document.querySelectorAll(selector));
        }

        const observer = new MutationObserver(_ => {
            if (document.querySelectorAll(selector).length >= amount) {
                resolve(document.querySelectorAll(selector));
                observer.disconnect();
            }
        });

        observer.observe(observeEl, {
            childList: true,
            subtree: true
        });
    });
}

//continuously waits for element to appear
export const onElementObserved = (observeEl: Element, selectorId: string, callback: (node: Element) => void): void => {
    const observer = new MutationObserver(mutations => {
        for(let mutation of mutations){
            if(mutation.addedNodes.length > 0){
                    for(let addedNode of mutation.addedNodes){
                        
                        if(addedNode instanceof Element && addedNode.id && addedNode.id.includes(selectorId)){
                            callback(addedNode);
                        }
                    }
                    
                    
            }
        }
        
    });

    observer.observe(observeEl, {
        childList: true,
        subtree: true
    });
}

//continuously waits for element to appear and returns mutations
export const onCustomElementObserved = (observerEl: Element, callback: (mutations: MutationRecord[]) => void): void => {
    const observer = new MutationObserver(mutations => {
        callback(mutations);
    });

    observer.observe(observerEl, {
        characterData: true,
        subtree: true,
        childList: true
    });
}

export const elementBuilder = (tagName: string, elAttributes: Record<string, any>, parentEl?: Element): HTMLElement => {
    //creates element and sets any attributes passed
    const el = document.createElement(tagName);
    for(let attrKey in elAttributes){
        (el as any)[attrKey] = elAttributes[attrKey];
    }
    //append to parent if exist
    if(parentEl) parentEl.appendChild(el);
    return el;
}



export const escapeRegExp = (string: string) => {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


export function getWindowWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

export function getWindowHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}