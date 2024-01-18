import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer : Renderer2;
  private colorTheme : string = '';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null)
  }

  initTheme() : void {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  update(theme: 'darkTheme' | 'lightTheme') : void {
    this.setColorThem(theme);
    const previousColorTheme = theme === 'darkTheme' ? 'lightTheme' : 'darkTheme';
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  isDarkMode() : boolean {
    return this.colorTheme === 'darkTheme'
  }

  private setColorThem(theme : string) : void {
    this.colorTheme = theme;
    localStorage.setItem('user-theme', theme);
  }

  private getColorTheme() : void {
    if (localStorage.getItem('user-theme')) {
      this.colorTheme = localStorage.getItem('user-theme')!;
    } else {
      this.colorTheme = 'lightTheme'
    }
  }
}
