const fs = require('fs');
const Path = require('path');

const _ = require('lodash');
const random = require('random');
const seedrandom = require('seedrandom');
const trianglify = require('trianglify');
const yargs = require('yargs');

const postsPath = Path.join(__dirname, '../content/posts');
const bannersPath = Path.join(__dirname, '../static/banners');

const ls = path => fs.readdirSync(path);
const lsFilter = (path, filter, noExt) =>
  ls(path)
    .filter(file => file.match(filter))
    .map(name => (noExt ? name.replace(filter, '') : name));

const flags = yargs.argv;

init().catch(error => console.error(error));

function init() {
  let posts = lsFilter(postsPath, /.md$/, true);
  let banners = lsFilter(bannersPath, /\@banner.svg$/, true);

  console.log('posts', posts);
  console.log('banners', banners);

  if (flags.force) {
    deleteBanners(banners, bannersPath);
    return generateBanners(posts, bannersPath);
  }

  let bannersToDelete = _.difference(banners, posts);
  let bannersToCreate = _.difference(posts, banners);

  console.log('bannersToDelete', bannersToDelete);
  console.log('bannersToCreate', bannersToCreate);

  if (!bannersToDelete.length) console.log('No banners to remove');
  if (!bannersToCreate.length) console.log('No banners to create');

  deleteBanners(bannersToDelete, bannersPath);
  return generateBanners(bannersToCreate, bannersPath);
}

function deleteBanners(list, path) {
  for (let name of list) {
    deleteBanner(`${path}/${name}@banner.svg`);
    deleteBanner(`${path}/${name}@social.svg`);
  }
}

function deleteBanner(file) {
  try {
    fs.unlinkSync(file);
    console.log(`Banner removed: ${file}`);
    return true;
  } catch (err) {
    return false;
  }
}

async function generateBanners(list, path) {
  for (let name of list) {
    await saveImage({
      name,
      path: `${path}/${name}@banner.svg`,
      width: 2500,
      height: 625,
      white: false,
    });
    await saveImage({
      name,
      path: `${path}/${name}@social.svg`,
      width: 1200,
      height: 675,
      white: true,
    });
  }
}

async function saveImage(params) {
  let bannerPath = params.path;
  let content = generateSVG(params);
  fs.writeFileSync(bannerPath, content);
  console.log(`Banner created: ${bannerPath}`);
  return bannerPath;
}

function generateSVG({ name, width, height, white }) {
  random.use(seedrandom(name));

  let rand = list => {
    let index = random.int(0, list.length - 1);
    return list[index];
  };

  let options = {
    width: width,
    height: height,
    xColors: 'random',
    yColors: 'random',
    cellSize: rand([75, 150, 100]),
    colorSpace: rand(['rgb', 'hsv', 'hsl', 'hsi', 'lab', 'hcl']),
    fill: false,
    seed: name,
    strokeWidth: 2,
    variance: rand([0, 0.75, 1, 1.5, 2, 2.5, 3]),
  };

  const svg = trianglify(options).toSVG();

  svg.attrs['view-box'] = `0 0 ${svg.attrs.width} ${svg.attrs.height}`;
  svg.children.forEach(child => {
    if (child.tagName === 'path') {
      child.attrs.fill = 'transparent';
    }
  });

  const output = svg.toString();
  return output;
}
