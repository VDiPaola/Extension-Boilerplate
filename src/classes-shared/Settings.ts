// @ts-ignore
import Browser from "webextension-polyfill";

class SettingChangedEvent {
    oldValue: any;
    newValue: any;
    
    constructor(oldValue: any, newValue: any) {
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}

class Setting {
    key: string;
    defaultValue: any;
    local: boolean;
    _listeners: Set<(event: SettingChangedEvent) => void>;

    constructor(key: string, defaultValue: any, local: boolean = false) {
        this.key = key;
        this.defaultValue = defaultValue;
        this.local = local;
        this._listeners = new Set();

        Browser.storage.onChanged.addListener((changes: any, _: string) => {
            for (let [key, change] of Object.entries(changes)) {
              const changeData = change as { oldValue: any; newValue: any };
              if(key == this.key && changeData.oldValue != changeData.newValue){
                // Call all registered listeners with the old and new values
                this._listeners.forEach(listener => {
                    listener(new SettingChangedEvent(changeData.oldValue, changeData.newValue));
                });
                break;
              }
            }
        });
    }

    addChangeListener(listener: (event: SettingChangedEvent) => void) {
        this._listeners.add(listener);
    }

    removeChangeListener(listener: (event: SettingChangedEvent) => void) {
        this._listeners.delete(listener);
    }

    Get(): Promise<any> {
        return new Promise((resolve, reject) => {
            if(this.local){
                LocalSetting.Get(this.key).then((value: any) => {
                    let res = value[this.key] ?? this.defaultValue;
                    resolve(res);
                })
                .catch((err: any) => reject(err));
            }else{
                GlobalSetting.Get(this.key).then((value: any) => {
                    let res = value[this.key] ?? this.defaultValue;
                    resolve(res);
                })
                .catch((err: any) => reject(err));
            }
        })
    }

    Set(value: any): Promise<void> {
        return new Promise((resolve, reject) => {
            if(this.local){
                LocalSetting.Set(this.key, value).then((result: void) => {
                    resolve(result);
                })
                .catch((err: any) => reject(err));
            }else{
                GlobalSetting.Set(this.key, value).then((result: void) => {
                    resolve(result);
                })
                .catch((err: any) => reject(err));
            }
        })
    }
}

export class GlobalSetting {
    static GLOBAL_TEST = new Setting('GLOBAL_TEST', false, false);

    static Get(keys: string | string[] | object): Promise<any> {
        return new Promise((resolve, reject) => {
            Browser.storage.sync.get(keys)
            .then((result: any) => {
                resolve(result);
            })
            .catch((err: any) => reject(err));
        });
    }

    static Set(key: string, value: any): Promise<void> {
        return new Promise((resolve, reject) => {
            Browser.storage.sync.set({[key]: value})
            .then((result: void) => {
                resolve(result);
            })
            .catch((err: any) => reject(err));
        });
    }
    
}

export class LocalSetting {
    static LOCAL_TEST = new Setting('LOCAL_TEST', true, true);

    static Get(keys: string | string[] | object): Promise<any> {
        return new Promise((resolve, reject) => {
            Browser.storage.local.get(keys)
            .then((result: any) => {
                resolve(result);
            })
            .catch((err: any) => reject(err));
        });
    }

    static Set(key: string, value: any): Promise<void> {
        return new Promise((resolve, reject) => {
            Browser.storage.local.set({[key]: value})
            .then((result: void) => {
                resolve(result);
            })
            .catch((err: any) => reject(err));
        });
    }
}