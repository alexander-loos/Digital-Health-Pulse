// Digital Health Pulse shared script. Loaded in <head> on every page.

// 1. Theme: light by default; dark only if the visitor chose it.
(function(){
  try { if (localStorage.getItem('dhpTheme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); } catch(e) {}
})();

// 2. First visit of the session: play the entrance (rules draw, helix spirals in).
(function(){
  try {
    if (!sessionStorage.getItem('dhpIntroSeen')) {
      document.documentElement.classList.add('js-intro');
      sessionStorage.setItem('dhpIntroSeen', '1');
    }
  } catch(e) {}
})();

function dhpIsDark(){ return document.documentElement.getAttribute('data-theme') === 'dark'; }
function dhpSyncThemeBtn(){
  var b = document.getElementById('theme-btn');
  if (b) b.textContent = dhpIsDark() ? 'Light mode' : 'Dark mode';
}
function toggleTheme(){
  var next = dhpIsDark() ? 'light' : 'dark';
  if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
  try { localStorage.setItem('dhpTheme', next); } catch(e) {}
  dhpSyncThemeBtn();
}

document.addEventListener('DOMContentLoaded', function(){
  dhpSyncThemeBtn();
  // On pages without the volume picker, show the latest volume as a link back to the tracker.
  var link = document.getElementById('vol-link');
  if (link) {
    fetch('companies.json').then(function(r){ return r.json(); }).then(function(d){
      var v = (d.meta && d.meta.volumes) || []; var l = v[v.length - 1];
      if (l) link.textContent = 'Vol. ' + l.number + ', ' + l.label;
    }).catch(function(){});
  }
});
